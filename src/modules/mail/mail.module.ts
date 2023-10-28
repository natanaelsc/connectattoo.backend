import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation/email-confirmation.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASS_EMAIL,
        },
        ignoreTLS: true,
      },
    }),
  ],
  providers: [EmailConfirmationService, MailService],
  controllers: [EmailConfirmationController],
})
export class MailModule {}
