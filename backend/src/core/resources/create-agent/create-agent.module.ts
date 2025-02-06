import { Module } from '@nestjs/common';
import { CreateAgentService } from './create-agent.service';
import { CreateAgentController } from './create-agent.controller';
import { CoinbaseAgentModule } from 'src/lib/coinbase-agent/coinbase-agent.module';
import { CovalentAgentModule } from 'src/lib/covalent-agent/covalent-agent.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from './agent.schema';
import { CreateAgentRepository } from './create-agent.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    CoinbaseAgentModule.register(),
    CovalentAgentModule.register(),
  ],
  controllers: [CreateAgentController],
  providers: [CreateAgentService, CreateAgentRepository],
  exports: [CreateAgentService, CreateAgentRepository],
})
export class CreateAgentModule {}
