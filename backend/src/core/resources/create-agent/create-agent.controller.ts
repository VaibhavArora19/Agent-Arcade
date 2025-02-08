import { Body, Controller, Post } from '@nestjs/common';
import { CreateAgentService } from './create-agent.service';
import { CreateAgentDto, CreateElizaAgentDto } from './dto/create-agent-dto';

@Controller('create-agent')
export class CreateAgentController {
  constructor(private readonly createAgentService: CreateAgentService) {}

  @Post()
  async create(@Body() createAgentDto: CreateAgentDto) {
    await this.createAgentService.create(createAgentDto);
  }

  @Post('flow')
  async createFlowAgent(@Body() createElizaAgentDto: CreateElizaAgentDto) {
    const data =
      await this.createAgentService.createFlowAgent(createElizaAgentDto);

    return data;
  }
}
