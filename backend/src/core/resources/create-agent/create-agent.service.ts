import { Injectable } from '@nestjs/common';
import { CreateAgentDto, CreateElizaAgentDto } from './dto/create-agent-dto';
import * as path from 'path';
import { CreateAgentRepository } from './create-agent.repository';
import * as fs from 'fs';
import { CreateElizaAgentRepository } from './create-eliza-agent,repository';

@Injectable()
export class CreateAgentService {
  constructor(
    private readonly createAgentRepository: CreateAgentRepository,
    private readonly createElizaAgentRepository: CreateElizaAgentRepository,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    const newAgent = await this.createAgentRepository.create({
      ...createAgentDto,
    });

    return newAgent;
  }

  async createFlowAgent(createElizaAgentDto: CreateElizaAgentDto) {
    //store the agent info in db
    await this.createElizaAgentRepository.create(createElizaAgentDto);

    let readFile;

    console.log('dirname', __dirname);

    if (createElizaAgentDto.type === 'game') {
      readFile = fs.readFileSync(
        path.join(
          process.cwd(),
          '/src/core/resources/create-agent/characters/game.json',
        ),
        'utf-8',
      );
    } else if (createElizaAgentDto.type === 'social') {
      readFile = fs.readFileSync(
        path.join(
          process.cwd(),
          '/src/core/resources/create-agent/characters/social-character.json',
        ),
        'utf-8',
      );
    } else if (createElizaAgentDto.type === 'ai-companion') {
      readFile = fs.readFileSync(
        path.join(
          process.cwd(),
          '/src/core/resources/create-agent/characters/ai-companion.json',
        ),
        'utf-8',
      );
    } else {
      readFile = fs.readFileSync(
        path.join(
          process.cwd(),
          '/src/core/resources/create-agent/characters/defi-character.json',
        ),
        'utf-8',
      );
    }

    const jsonObject = JSON.parse(readFile);

    jsonObject.name = createElizaAgentDto.agentName;
    jsonObject.bio = createElizaAgentDto.bio;

    const filePath = path.join(
      process.cwd(),
      `../elizaOnFlow/characters/${createElizaAgentDto.agentName}.json`,
    );

    fs.writeFile(filePath, JSON.stringify(jsonObject, null, 2), function (err) {
      if (err) {
        console.log(err);
      }
    });

    //! create the image and then create the container
  }
}
