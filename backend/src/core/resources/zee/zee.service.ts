import { Injectable } from '@nestjs/common';
import { ZeeRepository } from './zee.repository';
import { CreateZeeDto } from './dto/create-zee.dto';
import { ZeeWorkflow } from '@covalenthq/ai-agent-sdk';
import { CovalentAgentService } from 'src/lib/covalent-agent/covalent-agent.service';

@Injectable()
export class ZeeService {
  constructor(
    private readonly ZeeRepository: ZeeRepository,
    private readonly covalentAgentService: CovalentAgentService,
  ) {}

  async create(createZeeDto: CreateZeeDto) {
    const data = await this.ZeeRepository.create(createZeeDto);

    return data;
  }

  async runZeeWorkflow(zeeName: string) {
    const data = await this.ZeeRepository.findByName(zeeName);

    const { agent: agent1 } = await this.covalentAgentService.initializeAgent(
      data.agents[0],
    );

    const { agent: agent2 } = await this.covalentAgentService.initializeAgent(
      data.agents[1],
    );

    const zee = new ZeeWorkflow({
      description: data.zeeDescription,
      output: data.goal,
      agents: { agent1, agent2 },
    });

    const result = await ZeeWorkflow.run(zee);

    console.log('result is', result);
  }
}
