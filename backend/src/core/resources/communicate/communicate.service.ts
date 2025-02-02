import { Injectable } from '@nestjs/common';
import { AgentKitService } from 'src/lib/agent-kit/agent-kit.service';

@Injectable()
export class CommunicateService {
  constructor(private readonly agentKitService: AgentKitService) {}

  async runCoinbaseAgent() {
    await this.agentKitService.main();
  }
}
