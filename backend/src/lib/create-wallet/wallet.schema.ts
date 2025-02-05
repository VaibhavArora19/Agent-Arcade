import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Wallet {
  @Prop({
    type: String,
    required: true,
  })
  userAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  walletAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  walletPrivateKey: string;
}

export const walletSchema = SchemaFactory.createForClass(Wallet);
