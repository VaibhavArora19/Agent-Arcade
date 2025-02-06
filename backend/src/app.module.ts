import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommunicateModule } from './core/resources/communicate/communicate.module';
import { CreateAgentModule } from './core/resources/create-agent/create-agent.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ZeeModule } from './core/resources/zee/zee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ??
          'mongodb://localhost:27017/agentic-eth',
      }),
    }),
    CommunicateModule,
    CreateAgentModule,
    ZeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
