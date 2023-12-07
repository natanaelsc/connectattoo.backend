import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
      defaults: { from: `"Connectattoo" <${process.env.MAILDEV_FROM}>` },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
