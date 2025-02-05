import { DynamicModule, Module } from '@nestjs/common';
import { CreateWalletService } from './create-wallet.service';

@Module({})
export class CreateWalletModule {
  static register(): DynamicModule {
    return {
      module: CreateWalletModule,
      providers: [CreateWalletService],
      exports: [CreateWalletService],
    };
  }
}
