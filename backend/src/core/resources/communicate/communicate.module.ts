import { Module } from '@nestjs/common';
import { CommunicateService } from './communicate.service';
import { CommunicateController } from './communicate.controller';
import { CoinbaseAgentModule } from 'src/lib/coinbase-agent/coinbase-agent.module';
import { CreateAgentModule } from '../create-agent/create-agent.module';
import { CovalentAgentModule } from 'src/lib/covalent-agent/covalent-agent.module';

@Module({
  imports: [
    CoinbaseAgentModule.register(),
     CovalentAgentModule.register(),
    CreateAgentModule,
  ],
  controllers: [CommunicateController],
  providers: [CommunicateService],
})
export class CommunicateModule {}
