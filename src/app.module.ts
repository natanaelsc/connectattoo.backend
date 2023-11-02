import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { MailModule } from './modules/mail/mail.module';
import { TattooClientModule } from './modules/tattoo-client/tattoo-client.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, MailModule, TattooClientModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
