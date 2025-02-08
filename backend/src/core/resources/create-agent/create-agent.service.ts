import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgentDto, CreateElizaAgentDto } from './dto/create-agent-dto';
import * as path from 'path';
import { CreateAgentRepository } from './create-agent.repository';
import * as fs from 'fs';
import { CreateElizaAgentRepository } from './create-eliza-agent.repository';
import * as Docker from 'dockerode';

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
    try {
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

      fs.writeFile(
        filePath,
        JSON.stringify(jsonObject, null, 2),
        function (err) {
          if (err) {
            console.log(err);
          }
        },
      );

      const dockerFilePath = path.resolve(process.cwd(), '../');

      const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

      console.log('File path: ', dockerFilePath);

      console.log('Bulding agent image....');

      const imageStream = await docker.buildImage(
        {
          context: dockerFilePath,
          src: ['Dockerfile', 'elizaOnFlow'],
        },
        {
          t: 'my-test-image-agentic',
        },
      );

      await new Promise((resolve, reject) => {
        docker.modem.followProgress(imageStream, (err, res) =>
          err ? reject(err) : resolve(res),
        );
      });

      console.log('Image built successfully!');

      console.log('Creating container...');

      // Create a container with a custom command
      const container = await docker.createContainer({
        Image: 'my-test-image-agentic',
        ExposedPorts: { '3000/tcp': {} },
        HostConfig: {
          PortBindings: {
            '3000/tcp': [{ HostPort: '3000' }],
          },
        },
      });

      console.log('Starting container...');
      await container.start();

      console.log('Container created...');

      return { status: HttpStatus.OK };
    } catch (error) {
      console.log(error);
    }
  }
}
