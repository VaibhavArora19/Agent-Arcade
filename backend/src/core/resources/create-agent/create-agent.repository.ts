import { InjectModel } from '@nestjs/mongoose';
import { Agent } from './agent.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAgentRepository {
  constructor(@InjectModel(Agent.name) private agentModel: Model<Agent>) {}

  async create(agent: any) {
    const newAgent = new this.agentModel(agent);

    return newAgent.save();
  }

  async findByName(agentName: string) {
    const agent = await this.agentModel.findOne({ agentName });

    return agent;
  }
}
