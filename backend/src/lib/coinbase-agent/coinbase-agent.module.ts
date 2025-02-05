import { DynamicModule, Module } from '@nestjs/common';
import { CoinbaseAgentService } from './coinbase-agent.service';

@Module({})
export class CoinbaseAgentModule {
  static register(): DynamicModule {
    return {
      module: CoinbaseAgentModule,
      providers: [CoinbaseAgentService],
      exports: [CoinbaseAgentService],
    };
  }
}
