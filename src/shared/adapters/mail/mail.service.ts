import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(
    email: string,
    firstName: string,
    accessToken: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmação de Cadastro',
      template: 'email-confirmation',
      context: {
        username: firstName,
        url: `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`,
      },
    });
  }
}
