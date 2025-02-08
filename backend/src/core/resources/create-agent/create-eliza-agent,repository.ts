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

  async create(createElizaAgentDto: CreateElizaAgentDto) {
    const newElizaAgent = new this.elizaAgentModel(createElizaAgentDto);

    return newElizaAgent.save();
  }
}
