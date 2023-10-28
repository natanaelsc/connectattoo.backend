import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

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
})
export class MailModule {}
