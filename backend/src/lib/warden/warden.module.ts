import { DynamicModule, Module } from '@nestjs/common';
import { WardenService } from './warden.service';

@Module({})
export class WardenModule {
  static register(): DynamicModule {
    return {
      module: WardenModule,
      providers: [WardenService],
      exports: [WardenService],
    };
  }
}
