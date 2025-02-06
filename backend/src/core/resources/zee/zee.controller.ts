import { Body, Controller, Post } from '@nestjs/common';
import { ZeeService } from './zee.service';
import { CreateZeeDto } from './dto/create-zee.dto';

@Controller('zee')
export class ZeeController {
  constructor(private readonly zeeService: ZeeService) {}

  @Post('create')
  async create(@Body() createZeeDto: CreateZeeDto) {
    const data = await this.zeeService.create(createZeeDto);

    return data;
  }
}
