import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './mail.service';

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
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
