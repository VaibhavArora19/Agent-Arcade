import { Injectable } from '@nestjs/common';
import { AgentKitService } from 'src/lib/agent-kit/agent-kit.service';
import { CommunicateDto } from './dto/communicate.dto';
import { WardenService } from 'src/lib/warden/warden.service';

@Injectable()
export class CommunicateService {
  constructor(
    private readonly agentKitService: AgentKitService,
    private readonly wardenService: WardenService,
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
