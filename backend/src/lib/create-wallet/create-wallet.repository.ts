import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './wallet.schema';
import { Model } from 'mongoose';

@Injectable()
export class CreateWalletRepository {
  constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

  async create(wallet: any) {
    const newWallet = new this.walletModel(wallet);

    await newWallet.save();
  }
}
