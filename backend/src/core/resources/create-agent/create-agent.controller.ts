import { Body, Controller, Post } from '@nestjs/common';
import { CreateAgentService } from './create-agent.service';
import { CreateAgentDto, SDK } from './dto/create-agent-dto';
import { CoinbaseAgentService } from 'src/lib/coinbase-agent/coinbase-agent.service';
import { CovalentAgentService } from 'src/lib/covalent-agent/covalent-agent.service';
import { WardenAgentService } from 'src/lib/warden-agent/warden-agent.service';

@Controller('create-agent')
export class CreateAgentController {
  constructor(
    private readonly createAgentService: CreateAgentService,
    private readonly coinbaseAgentService: CoinbaseAgentService,
    private readonly covalentAgentService: CovalentAgentService,
    private readonly wardenAgentService: WardenAgentService,
  ) {}

  @Post()
  async create(@Body() createAgentDto: CreateAgentDto) {
    await this.createAgentService.create(createAgentDto);
  }
}
