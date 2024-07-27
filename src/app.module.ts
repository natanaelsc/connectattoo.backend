import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { ModulesModule } from './modules/modules.module';
import { AdapterModule } from './shared/adapters/adapter.module';
import { HttpExceptionFilter } from './shared/interceptor/exception-filter.interceptor';

@Module({
  imports: [
    AdapterModule,
    ModulesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'pages/user-confirmation-page'),
      serveRoot: '/confirm-email',
    }),
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
  controllers: [AppController],
})
export class AppModule {}
