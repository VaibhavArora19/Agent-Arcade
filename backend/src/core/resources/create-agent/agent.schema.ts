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
    type: Array<String>,
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

export const AgentSchema = SchemaFactory.createForClass(Agent);
