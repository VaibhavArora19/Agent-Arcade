import { DynamicModule, Module } from '@nestjs/common';
import { CovalentService } from './covalent.service';

@Module({})
export class CovalentModule {
  static register(): DynamicModule {
    return {
      module: CovalentModule,
      providers: [CovalentService],
      exports: [CovalentService],
    };
  }
}
