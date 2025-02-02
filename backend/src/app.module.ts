import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommunicateModule } from './core/resources/communicate/communicate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CommunicateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
