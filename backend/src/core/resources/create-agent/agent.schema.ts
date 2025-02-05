import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SDK } from './dto/create-agent-dto';

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
    type: String,
    required: false,
  })
  task: string;

  @Prop({
    type: MongooseSchema.Types.Mixed,
  })
  agent: any;

  @Prop({
    type: MongooseSchema.Types.Mixed,
  })
  agentConfig: any;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
