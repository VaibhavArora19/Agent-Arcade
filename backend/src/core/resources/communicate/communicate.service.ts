import { Injectable } from '@nestjs/common';
import { CoinbaseAgentService } from 'src/lib/coinbase-agent/coinbase-agent.service';
import { CommunicateDto } from './dto/communicate.dto';
import { CreateAgentRepository } from '../create-agent/create-agent.repository';
import { SDK } from '../create-agent/dto/create-agent-dto';
import { CovalentAgentService } from 'src/lib/covalent-agent/covalent-agent.service';

@Injectable()
export class CommunicateService {
  constructor(
    private readonly agentKitService: CoinbaseAgentService,
    private readonly covalentAgentService: CovalentAgentService,
    private readonly createAgentRepository: CreateAgentRepository,
  ) {}

  async comunicate(agentName: string, communicateDto: CommunicateDto) {
    const agent = await this.createAgentRepository.findByName(agentName);

    switch (agent.sdk) {
      case SDK.AGENT_KIT:
        let res = await this.agentKitService.runCoinbaseAgent(
          communicateDto.userInput,
        );
        return res;
      case SDK.COVALENT:
        const response = await this.covalentAgentService.runCovalentAgent(
          agentName,
          communicateDto.userInput,
        );
        return response;
    }
  }
}
