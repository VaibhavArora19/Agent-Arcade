import { Injectable } from '@nestjs/common';
import { WardenAgentKit } from '@wardenprotocol/warden-agent-kit-core';
import { WardenToolkit } from '@wardenprotocol/warden-langchain';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ConfigService } from '@nestjs/config';
import { HumanMessage } from '@langchain/core/messages';

@Injectable()
export class WardenAgentService {
  constructor(private readonly configService: ConfigService) {}

  async initializeAgent() {
    // Configure Warden Agent Kit
    const config = {
      privateKeyOrAccount:
        (this.configService.get<string>('PRIVATE_KEY') as `0x${string}`) ||
        undefined,
    };

    // Initialize Warden Agent Kit
    const agentkit = new WardenAgentKit(config);

    // Initialize Warden Agent Kit Toolkit and get tools
    const wardenToolkit = new WardenToolkit(agentkit as any);
    const tools = wardenToolkit.getTools();

    // Initialize LLM
    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
    });

    // Create React Agent using the LLM and Warden Agent Kit tools
    const agent = createReactAgent({
      llm,
      tools,
      messageModifier:
        "You're a helpful assistant that can help with a variety of tasks related to web3 tranactions." +
        'You should only use the provided tools to carry out tasks, interperate the users input' +
        'and select the correct tool to use for the required tasks or tasks.',
    });

    return { agent, config };
  }

  async runChatMode(agent: any, config: any, userInput: string) {
    console.log('Processing prompt in warden protocol....');

    try {
      const stream = await agent.stream(
        { messages: [new HumanMessage(userInput)] },
        config,
      );

      for await (const chunk of stream) {
        if ('agent' in chunk) {
          console.log(chunk.agent.messages[0].content);
          return chunk.agent.messages[0].content;
        } else if ('tools' in chunk) {
          console.log(chunk.tools.messages[0].content);

          return chunk.tools.messages[0].content;
        }
        console.log('-------------------');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      process.exit(1);
    }
  }

  async runWardenAgent(userInput: string) {
    try {
      const { agent, config } = await this.initializeAgent();

      const res = await this.runChatMode(agent, config, userInput);

      return res;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      process.exit(1);
    }
  }
}
