import { Injectable } from '@nestjs/common';
import { CoinbaseAgentService } from 'src/lib/coinbase-agent/coinbase-agent.service';
import { CommunicateDto } from './dto/communicate.dto';
import { WardenAgentService } from 'src/lib/warden-agent/warden-agent.service';

@Injectable()
export class CommunicateService {
  constructor(
    private readonly agentKitService: CoinbaseAgentService,
    private readonly wardenService: WardenAgentService,
  ) {}

  async runCoinbaseAgent(communicateDto: CommunicateDto) {
    const res = await this.agentKitService.runCoinbaseAgent(
      communicateDto.userInput,
    );
    return res;
  }

  async runWardenAgent(communicateDto: CommunicateDto) {
    const res = await this.wardenService.runWardenAgent(
      communicateDto.userInput,
    );

    return res;
  }
}
