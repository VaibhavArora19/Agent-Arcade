import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommunicateModule } from './core/resources/communicate/communicate.module';
import { CreateAgentModule } from './core/resources/create-agent/create-agent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CommunicateModule,
    CreateAgentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
