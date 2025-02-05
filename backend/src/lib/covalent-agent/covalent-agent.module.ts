import { DynamicModule, Module } from '@nestjs/common';
import { CovalentAgentService } from './covalent-agent.service';

@Module({})
export class CovalentAgentModule {
  static register(): DynamicModule {
    return {
      module: CovalentAgentModule,
      providers: [CovalentAgentService],
      exports: [CovalentAgentService],
    };
  }
}
