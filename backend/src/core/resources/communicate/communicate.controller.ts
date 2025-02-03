import { Body, Controller, Post } from '@nestjs/common';
import { CommunicateService } from './communicate.service';
import { CommunicateDto } from './dto/communicate.dto';

@Controller('communicate')
export class CommunicateController {
  constructor(private readonly communicateService: CommunicateService) {}

  @Post('coinbase')
  async runCoinbaseAgent(@Body() communticateDto: CommunicateDto) {
    const response =
      await this.communicateService.runCoinbaseAgent(communticateDto);

    return {
      response,
    };
  }

  @Post('warden')
  async runWardenAgent(@Body() communticateDto: CommunicateDto) {
    const response =
      await this.communicateService.runWardenAgent(communticateDto);

    return {
      response,
    };
  }
}
