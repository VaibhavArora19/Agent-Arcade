import { Module } from '@nestjs/common';
import { ZeeService } from './zee.service';
import { ZeeController } from './zee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Zee, ZeeSchema } from './zee.schema';
import { ZeeRepository } from './zee.repository';
import { CovalentAgentModule } from 'src/lib/covalent-agent/covalent-agent.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Zee.name, schema: ZeeSchema }]),
    CovalentAgentModule.register(),
  ],
  controllers: [ZeeController],
  providers: [ZeeService, ZeeRepository],
})
export class ZeeModule {}
