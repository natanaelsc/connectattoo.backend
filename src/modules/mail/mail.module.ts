import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation/email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILDEV_HOST,
        secure: true,
        port: Number(process.env.MAILDEV_PORT),
        auth: {
          user: process.env.MAILDEV_USER,
          pass: process.env.MAILDEV_PASSWORD,
        },
        ignoreTLS: true,
      },
    }),
  ],
  providers: [EmailConfirmationService, MailService],
  controllers: [EmailConfirmationController],
})
export class MailModule {}
