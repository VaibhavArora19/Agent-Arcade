import { DynamicModule, Module } from '@nestjs/common';
import { CovalentAgentService } from './covalent-agent.service';
import { CreateAgentModule } from 'src/core/resources/create-agent/create-agent.module';

@Module({})
export class CovalentAgentModule {
  static register(): DynamicModule {
    return {
      imports: [CreateAgentModule],
      module: CovalentAgentModule,
      providers: [CovalentAgentService],
      exports: [CovalentAgentService],
    };
  }
}
