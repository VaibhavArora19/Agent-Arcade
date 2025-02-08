import { Injectable } from '@nestjs/common';
import { CreateAgentDto, CreateElizaAgentDto } from './dto/create-agent-dto';
import path from 'path';
import { CreateAgentRepository } from './create-agent.repository';
import fs from 'fs';

@Injectable()
export class CreateAgentService {
  constructor(private readonly createAgentRepository: CreateAgentRepository) {}

  async create(createAgentDto: CreateAgentDto) {
    const newAgent = await this.createAgentRepository.create({
      ...createAgentDto,
    });

    return newAgent;
  }

  async createFlowAgent(createElizaAgentDto: CreateElizaAgentDto) {
    //!store the agent info in db

    const newAgent = await this.createAgentRepository.create({

    const filePath = path.join(
      __dirname,
      `../../../elizaOnFlow/characters/${createElizaAgentDto.agentName}.json`,
    );

    fs.writeFile(filePath, 'somejson daata', function (err) {
      if (err) {
        console.log(err);
      }
    });

    //! create the image and then create the container
  }
}
