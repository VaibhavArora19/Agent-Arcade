import { Injectable } from '@nestjs/common';
import { CreateAgentDto, SDK } from './dto/create-agent-dto';
import { CoinbaseAgentService } from 'src/lib/coinbase-agent/coinbase-agent.service';
import { CovalentAgentService } from 'src/lib/covalent-agent/covalent-agent.service';
import { WardenAgentService } from 'src/lib/warden-agent/warden-agent.service';
import { CreateAgentRepository } from './create-agent.repository';

@Injectable()
export class CreateAgentService {
  constructor(
    private readonly coinbaseAgentService: CoinbaseAgentService,
    private readonly covalentAgentService: CovalentAgentService,
    private readonly wardenAgentService: WardenAgentService,
    private readonly createAgentRepository: CreateAgentRepository,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    let agent: any;
    let config: any;

    switch (createAgentDto.sdk) {
      case SDK.AGENT_KIT:
        const agentInfo = await this.coinbaseAgentService.initializeAgent();
        agent = agentInfo.agent;
        config = agentInfo.config;
        break;
      case SDK.WARDEN:
        agent = await this.wardenAgentService.initializeAgent();
        break;
      case SDK.COVALENT:
        agent = await this.covalentAgentService.initializeAgent();
        break;
    }

    const newAgent = await this.createAgentRepository.create({
      ...createAgentDto,
      agent,
      config: config ?? null,
    });

    return newAgent;
  }
}
