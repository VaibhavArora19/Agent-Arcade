import { DynamicModule, Module } from '@nestjs/common';
import { WardenAgentService } from './warden-agent.service';

@Module({})
export class WardenAgentModule {
  static register(): DynamicModule {
    return {
      module: WardenAgentModule,
      providers: [WardenAgentService],
      exports: [WardenAgentService],
    };
  }
}
