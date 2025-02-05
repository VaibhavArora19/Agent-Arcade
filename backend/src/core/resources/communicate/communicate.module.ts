import { Module } from '@nestjs/common';
import { CommunicateService } from './communicate.service';
import { CommunicateController } from './communicate.controller';
import { CoinbaseAgentModule } from 'src/lib/coinbase-agent/coinbase-agent.module';
import { WardenAgentModule } from 'src/lib/warden-agent/warden-agent.module';

@Module({
  imports: [CoinbaseAgentModule.register(), WardenAgentModule.register()],
  controllers: [CommunicateController],
  providers: [CommunicateService],
})
export class CommunicateModule {}
