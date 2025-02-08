import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SDK, TYPE } from './dto/create-agent-dto';

@Schema({
  timestamps: true,
})
export class Agent {
  @Prop({
    type: String,
    required: true,
  })
  agentName: string;

  @Prop({
    type: String,
    required: true,
  })
  agentDescription: string;

  @Prop({
    type: String,
    enum: SDK,
    required: true,
  })
  sdk: SDK;

  @Prop({
    type: String,
    required: true,
  })
  chain: string;

  @Prop({
    type: Array<string>,
    required: false,
  })
  task: Array<string>;

  @Prop({
    type: String,
    enum: TYPE,
    required: true,
  })
  agentType: TYPE;
}

@Schema({
  timestamps: true,
})
export class ElizaAgent {
  @Prop({
    type: String,
    required: true,
  })
  agentName: string;

  @Prop({
    type: Array<string>,
    required: true,
  })
  bio: string[];

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: Array<string>,
    required: true,
  })
  knowledge: [string];

  @Prop({
    type: String,
  })
  imageName: string;

  @Prop({
    type: String,
  })
  containerName: string;

  @Prop({
    type: Number,
  })
  port: number;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);

export const ElizaAgentSchema = SchemaFactory.createForClass(ElizaAgent);
