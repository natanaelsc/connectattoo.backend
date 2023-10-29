import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation/email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { MailService } from './mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILDEV_HOST,
        secure: true,
        port: Number(process.env.MAILDEV_PORT),
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
        ignoreTLS: true,
      },
    }),
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, MailService],
  exports: [EmailConfirmationService, MailService],
})
export class MailModule {}
