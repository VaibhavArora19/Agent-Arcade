import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommunicateService } from './communicate.service';
import { CommunicateDto } from './dto/communicate.dto';

@Controller('communicate')
export class CommunicateController {
  constructor(private readonly communicateService: CommunicateService) {}

  @Post('/:agentName')
  async communicate(
    @Param('agentName') agentName: string,
    @Body() communicateDto: CommunicateDto,
  ) {
    const response = await this.communicateService.comunicate(
      agentName,
      communicateDto,
    );

    return {
      response,
    };
  }
}
