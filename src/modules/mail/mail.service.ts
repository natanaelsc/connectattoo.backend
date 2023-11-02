import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mail } from './mail';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async sendMail(mail: Mail): Promise<void> {
    await this.mailerService.sendMail({
      from: `"Connectattoo" <${process.env.MAILDEV_FROM}>`,
      to: mail.email,
      subject: mail.subject,
      html: mail.html,
    });
  }

  async sendVerificationLink(email: string): Promise<void> {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.EMAIL_CONFIRMATION_SECRET_KEY,
      expiresIn: process.env.EMAIL_CONFIRMATION_EXPIRES_IN,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

    const mail = {
      email,
      subject: 'Confirmação de Cadastro',
      html: `<p> Olá, seu cadastro na Connectattoo está quase pronta.
      <br> Para ativá-lo, por favor confirme seu endereço de email clicando no link abaixo.
      <br> Sua conta não será ativada até que seu email seja confirmado.
      <br>
      <p><a href="${url}">Clique aqui para confirmar seu cadastro.</a></p>`,
    };

    await this.sendMail(mail);
  }

  async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.EMAIL_CONFIRMATION_SECRET_KEY,
      });
      if (typeof payload === 'object' && payload.hasOwnProperty('email')) {
        return payload.email;
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Link expirado');
      }
      throw new BadRequestException('Link inválido');
    }
  }
}
