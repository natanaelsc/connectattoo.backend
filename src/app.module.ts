import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { TattooClientModule } from './modules/tattoo-client/tattoo-client.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, MailModule, TattooClientModule],
})
export class AppModule {}
