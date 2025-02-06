import {
  Agent,
  AgentName,
  HistoricalTokenPriceTool,
  TokenBalancesTool,
  Tool,
} from '@covalenthq/ai-agent-sdk';
import { ZeeWorkflowState } from '@covalenthq/ai-agent-sdk/dist/core/state';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateAgentRepository } from 'src/core/resources/create-agent/create-agent.repository';
import type {
  ChatCompletionAssistantMessageParam,
  ChatCompletionMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/chat/completions';
import { ParsedFunctionToolCall } from 'openai/resources/beta/chat/completions';

type ZeeWorkflowStatus = 'idle' | 'running' | 'paused' | 'failed' | 'finished';

type ZeeWorkflowStateOptions = {
  agent: AgentName;
  messages: ChatCompletionMessageParam[];
  status?: ZeeWorkflowStatus;
  children?: ZeeWorkflowState[];
};

const user = (content: string): ChatCompletionUserMessageParam => ({
  role: 'user',
  content,
});

@Injectable()
export class CovalentAgentService {
  constructor(
    private readonly createAgentRepository: CreateAgentRepository,
    private readonly configService: ConfigService,
  ) {}

  async initializeAgent(agentName: string) {
    const agentInfo = await this.createAgentRepository.findByName(agentName);

    if (!agentInfo) {
      throw new NotFoundException('Agent not found');
    }

    let tools: any = {};

    const apiKey = this.configService.get('COVALENT_API_KEY');

    if (agentInfo.task.includes('token_balance')) {
      tools.tokenBalances = new TokenBalancesTool(apiKey);
    }

    if (agentInfo.task.includes('nft_balance')) {
      tools.nftBalances = new TokenBalancesTool(apiKey);
    }

    if (agentInfo.task.includes('transactions')) {
      tools.transactions = new TokenBalancesTool(apiKey);
    }

    if (agentInfo.task.includes('historical_token_price')) {
      tools.historicalTokenPrice = new HistoricalTokenPriceTool(apiKey);
    }

    const agent = new Agent({
      name: agentInfo.agentName,
      model: {
        provider: 'OPEN_AI',
        name: 'gpt-4o-mini',
      },
      description: agentInfo.agentDescription,
      tools,
    });

    return { agent, tools };
  }

  async runCovalentAgent(agentName: string, userInput: string) {
    const { agent, tools } = await this.initializeAgent(agentName);

    const state = this.createStateFn().root(agent.description);
    state.messages.push(user(userInput));

    const firstResult = await agent.run(state);

    const toolCall = firstResult.messages[
      firstResult.messages.length - 1
    ] as ChatCompletionAssistantMessageParam;

    const toolResponse = await this.runToolCalls(
      tools,
      toolCall?.tool_calls ?? [],
    );

    const updatedState = {
      ...firstResult,
      status: 'running' as const,
      messages: [...firstResult.messages, ...toolResponse],
    };

    const secondResult = await agent.run(updatedState);

    console.log('run is: ', firstResult);

    const secondToolCall = secondResult.messages[
      secondResult.messages.length - 1
    ] as ChatCompletionAssistantMessageParam;

    const transactionResponses = await this.runToolCalls(
      tools,
      secondToolCall?.tool_calls ?? [],
    );

    const finalState = {
      ...secondResult,
      messages: [...secondResult.messages, ...transactionResponses],
    };

    const finalResult = await agent.run(finalState);

    console.log('ff result', finalResult);

    return finalResult;
  }

  private async runToolCalls(
    tools: Record<string, Tool>,
    toolCalls: ParsedFunctionToolCall[],
  ): Promise<ChatCompletionToolMessageParam[]> {
    const results = await Promise.all(
      toolCalls.map(async (tc) => {
        if (tc.type !== 'function') {
          throw new Error('Tool call needs to be a function');
        }

        const tool = tools[tc.function.name];
        if (!tool) {
          throw new Error(`Tool ${tc.function.name} not found`);
        }

        const response = await tool.execute(JSON.parse(tc.function.arguments));

        return {
          role: 'tool',
          tool_call_id: tc.id,
          content: response,
        } satisfies ChatCompletionToolMessageParam;
      }),
    );

    return results;
  }

  private createStateFn() {
    const StateFn = {
      childState: (options: ZeeWorkflowStateOptions): ZeeWorkflowState => {
        const { agent, messages, status = 'idle', children = [] } = options;
        return {
          agent,
          messages,
          status,
          children,
        };
      },

      root: (workflowDescription: string): ZeeWorkflowState => {
        return StateFn.childState({
          agent: 'router',
          messages: [
            user(
              `Here is a description of my workflow: ${workflowDescription}`,
            ),
          ],
        });
      },
    };

    return StateFn;
  }
}
