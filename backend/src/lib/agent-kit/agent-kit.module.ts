import { DynamicModule, Module } from '@nestjs/common';
import { AgentKitService } from './agent-kit.service';

@Module({})
export class AgentKitModule {
  static register(): DynamicModule {
    return {
      module: AgentKitModule,
      providers: [AgentKitService],
      exports: [AgentKitService],
    };
  }
}
