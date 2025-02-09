import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AgentKit,
  wethActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  pythActionProvider,
  ViemWalletProvider,
} from '@coinbase/agentkit';

import { getLangChainTools } from '@coinbase/agentkit-langchain';
import { HumanMessage } from '@langchain/core/messages';
import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { arbitrum } from 'viem/chains';

@Injectable()
export class CoinbaseAgentService {
  constructor(private configService: ConfigService) {}
  /**
   * Initialize the agent with CDP Agentkit
   *
   * @returns Agent executor and config
   */
  async initializeAgent() {
    try {
      // Initialize LLM
      const llm = new ChatOpenAI({
        model: 'gpt-4o-mini',
      });

      const account = privateKeyToAccount(
        this.configService.get<string>('PRIVATE_KEY') as `0x${string}`,
      );

      const client = createWalletClient({
        account,
        chain: arbitrum,
        transport: http(),
      });

      const walletProvider = new ViemWalletProvider(client);

      // Initialize AgentKit
      const agentkit = await AgentKit.from({
        walletProvider,
        actionProviders: [
          wethActionProvider(),
          pythActionProvider(),
          walletActionProvider(),
          erc20ActionProvider(),
        ],
      });

      const tools = await getLangChainTools(agentkit);

      // Store buffered conversation history in memory
      const memory = new MemorySaver();
      const agentConfig = {
        configurable: { thread_id: 'CDP AgentKit Chatbot Example!' },
      };

      // Create React Agent using the LLM and CDP AgentKit tools
      const agent = createReactAgent({
        llm,
        tools,
        checkpointSaver: memory,
        messageModifier: `
        You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
        empowered to interact onchain using your tools. If you ever need funds, you can request them from the 
        faucet if you are on network ID 'arbitrum nova'. If not, you can provide your wallet details and request 
        funds from the user. Before executing your first action, get the wallet details to see what network 
        you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
        asks you to do something you can't do with your currently available tools, you must say so, and 
        encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
        docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from 
        restating your tools' descriptions unless it is explicitly requested.
        `,
      });

      //   // Save wallet data
      //   const exportedWallet = await walletProvider.exportWallet();
      //   fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedWallet));

      return { agent, config: agentConfig };
    } catch (error) {
      console.error('Failed to initialize agent:', error);
      throw error; // Re-throw to be handled by caller
    }
  }

  async runChatMode(agent: any, config: any, userInput: string) {
    console.log('Processing prompt in agent kit ....');

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

  async runCoinbaseAgent(userInput: string) {
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
