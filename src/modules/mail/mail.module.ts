import { MailerModule } from '@nestjs-modules/mailer';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TattooClientModule } from '../tattoo-client/tattoo-client.module';
import { EmailConfirmationController } from './email-confirmation/email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { MailService } from './mail.service';

@Module({
  imports: [
    forwardRef(() => TattooClientModule),
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
  providers: [MailService, EmailConfirmationService],
  exports: [MailService, EmailConfirmationService],
})
export class MailModule {}
