import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailConfirmationTemplate } from '~/shared/adapters/mail/templates';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendConfirmationEmail(
    email: string,
    name: string,
    accessToken: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmação de Cadastro',
      html: await EmailConfirmationTemplate({
        name,
        confirmationLink: `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`,
      })
    });
  }
}
