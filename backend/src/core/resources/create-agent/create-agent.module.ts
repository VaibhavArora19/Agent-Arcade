import { Module } from '@nestjs/common';
import { CreateAgentService } from './create-agent.service';
import { CreateAgentController } from './create-agent.controller';
import { CoinbaseAgentModule } from 'src/lib/coinbase-agent/coinbase-agent.module';
import { CovalentAgentModule } from 'src/lib/covalent-agent/covalent-agent.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Agent,
  AgentSchema,
  ElizaAgent,
  ElizaAgentSchema,
} from './agent.schema';
import { CreateAgentRepository } from './create-agent.repository';
import { CreateElizaAgentRepository } from './create-eliza-agent.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: AgentSchema }]),
    MongooseModule.forFeature([
      { name: ElizaAgent.name, schema: ElizaAgentSchema },
    ]),
    CoinbaseAgentModule.register(),
    CovalentAgentModule.register(),
  ],
  controllers: [CreateAgentController],
  providers: [
    CreateAgentService,
    CreateAgentRepository,
    CreateElizaAgentRepository,
  ],
  exports: [
    CreateAgentService,
    CreateAgentRepository,
    CreateElizaAgentRepository,
  ],
})
export class CreateAgentModule {}
