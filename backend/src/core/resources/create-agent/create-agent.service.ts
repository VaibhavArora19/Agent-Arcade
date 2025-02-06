import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent-dto';
import { CreateAgentRepository } from './create-agent.repository';

@Injectable()
export class CreateAgentService {
  constructor(private readonly createAgentRepository: CreateAgentRepository) {}

  async create(createAgentDto: CreateAgentDto) {
    const newAgent = await this.createAgentRepository.create({
      ...createAgentDto,
    });

    return newAgent;
  }
}
