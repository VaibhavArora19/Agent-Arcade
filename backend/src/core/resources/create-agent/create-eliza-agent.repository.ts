import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ElizaAgent } from './agent.schema';
import { Model } from 'mongoose';
import { CreateElizaAgentDto } from './dto/create-agent-dto';

@Injectable()
export class CreateElizaAgentRepository {
  constructor(
    @InjectModel(ElizaAgent.name)
    private readonly elizaAgentModel: Model<ElizaAgent>,
  ) {}

  async create(
    createElizaAgentDto: CreateElizaAgentDto & {
      imageName: string;
      containerName: string;
      port: number;
    },
  ) {
    const newElizaAgent = new this.elizaAgentModel(createElizaAgentDto);

    return newElizaAgent.save();
  }

  async findLast() {
    const agent = await this.elizaAgentModel.findOne().sort({ createdAt: -1 });

    return agent;
  }
}
