import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import Email from '../../../../emails/email-confirmation';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendConfirmationEmail(
    email: string,
    firstName: string,
    accessToken: string,
  ): Promise<void> {
    const html = render(Email({url:`${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`,userName:firstName}));
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmação de Cadastro',
      html:html
    });
  }
}
