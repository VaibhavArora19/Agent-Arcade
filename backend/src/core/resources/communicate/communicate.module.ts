import { Module } from '@nestjs/common';
import { CommunicateService } from './communicate.service';
import { CommunicateController } from './communicate.controller';
import { AgentKitModule } from 'src/lib/agent-kit/agent-kit.module';

@Module({
  imports: [AgentKitModule.register()],
  controllers: [CommunicateController],
  providers: [CommunicateService],
})
export class CommunicateModule {}
