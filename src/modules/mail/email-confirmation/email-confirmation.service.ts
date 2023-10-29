import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  public async sendVerificationLink(email: string): Promise<void> {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.EMAIL_CONFIRMATION_SECRET_KEY,
      expiresIn: process.env.EMAIL_CONFIRMATION_EXPIRES_IN,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

    const mailDto = {
      email,
      subject: 'Confirmação de Cadastro',
      html: `<p> Olá, seu cadastro na Connectattoo está quase pronta.
      <br> Para ativá-lo, por favor confirme seu endereço de email clicando no link abaixo.
      <br> Sua conta não será ativada até que seu email seja confirmado.
      <br>
      <p><a href="${url}">Clique aqui para confirmar seu cadastro.</a></p>`,
    };

    await this.mailService.sendEmail(mailDto);
  }
}
