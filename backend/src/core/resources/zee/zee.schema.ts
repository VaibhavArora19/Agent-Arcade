import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Zee {
  @Prop({
    type: String,
    required: true,
  })
  zeeName: string;

  @Prop({
    type: String,
    required: true,
  })
  zeeDescription: string;

  @Prop({
    type: String,
    required: true,
  })
  goal: string;

  @Prop({
    type: Array<String>,
    required: true,
  })
  agents: Array<string>;
}

export const ZeeSchema = SchemaFactory.createForClass(Zee);
