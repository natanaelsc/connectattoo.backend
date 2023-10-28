import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
