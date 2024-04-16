import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AdapterModule } from './shared/adapters/adapter.module';
import { AppController } from './app.controller';
import { PrismaModule } from './shared/adapters/prisma/prisma.module';
import { ProfileModule } from './modules/profile/profile.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/interceptor/exception-filter.interceptor';
import { TagModule } from './modules/tag/tag.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    AdapterModule,
    AuthModule,
    UserModule,
    PrismaModule,
    ProfileModule,
    TagModule,
    LocationModule
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
  controllers: [AppController],
})
export class AppModule {}
