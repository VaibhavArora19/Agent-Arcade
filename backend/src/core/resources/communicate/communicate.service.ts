import { Injectable } from '@nestjs/common';
import { AgentKitService } from 'src/lib/agent-kit/agent-kit.service';
import { CommunicateDto } from './dto/communicate.dto';

@Injectable()
export class CommunicateService {
  constructor(private readonly agentKitService: AgentKitService) {}

  async runCoinbaseAgent(communicateDto: CommunicateDto) {
    const res = await this.agentKitService.runCoinbaseAgent(
      communicateDto.userInput,
    );
    return res;
  }
}
