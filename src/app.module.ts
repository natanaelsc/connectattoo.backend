import { Module } from '@nestjs/common';
import { AdapterModule } from './shared/adapters/adapter.module';
import { AppController } from './app.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/interceptor/exception-filter.interceptor';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [AdapterModule, ModulesModule],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
  controllers: [AppController],
})
export class AppModule {}
