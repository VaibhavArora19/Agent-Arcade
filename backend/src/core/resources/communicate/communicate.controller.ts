import { Controller, Get } from '@nestjs/common';
import { CommunicateService } from './communicate.service';

@Controller('communicate')
export class CommunicateController {
  constructor(private readonly communicateService: CommunicateService) {}

  @Get()
  async runCoinbaseAgent() {
    await this.communicateService.runCoinbaseAgent();
  }
}
