import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: process.env.MAILDEV_HOST,
        secure: true,
        port: Number(process.env.MAILDEV_PORT),
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
        ignoreTLS: true,
      },
      preview: true,
      defaults: { from: `"Connectattoo" <${process.env.MAILDEV_FROM}>` },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
