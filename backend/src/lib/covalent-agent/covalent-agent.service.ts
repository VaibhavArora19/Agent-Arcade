import { Agent } from '@covalenthq/ai-agent-sdk';
import { Injectable } from '@nestjs/common';

//! this is incomplete
@Injectable()
export class CovalentAgentService {
  async initializeAgent() {
    const agent = new Agent({
      name: 'Reporting Agent',
      model: {
        provider: 'OPEN_AI',
        name: 'gpt-4o-mini',
      },
      description: 'This agent is responsible for generating reports',
      instructions: ['Generate a report on the current state of the company'],
    });

    return agent;
  }

  async runCovalentAgent(userInput: string) {
    const agent = await this.initializeAgent();

    const run = await agent.run();
  }
}
