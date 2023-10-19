import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  public async isValidConfirmationKeyInDataBse(
    confirmationKey: string,
  ): Promise<any> {
    if (!confirmationKey) {
      throw new Error('Token inválido ou já autenticado');
    }

    const dataBaseEmail = await this.prisma.user.findMany({
      select: { confirmation_key: true },
    });

    const listConfirmationKeyDataBase: any[] = [];
    dataBaseEmail.forEach((item) => {
      const foundConfirmationKeyDatabase = item.confirmation_key;
      listConfirmationKeyDataBase.push(foundConfirmationKeyDatabase);
    });

    const verifyConfirmationKeyInDataBase =
      listConfirmationKeyDataBase.includes(confirmationKey);

    console.log(
      'verifyConfirmationKeyInDataBase',
      verifyConfirmationKeyInDataBase,
    );

    if (verifyConfirmationKeyInDataBase) {
      const queryUserFound = await this.prisma.user.updateMany({
        where: {
          confirmation_key: {
            contains: confirmationKey,
          },
        },
        data: {
          confirmation_key: '',
          confirmation_sit: 1,
        },
      });

      console.log('queryUserFound', queryUserFound);
    }
  }

  public async getConfirmation_key(url): Promise<string> {
    const urlParams = new URLSearchParams(new URL(url.urlSite).search);
    const confirmation_key = urlParams.get('confirmation_key');
    console.log(confirmation_key);

    return this.isValidConfirmationKeyInDataBse(confirmation_key);
  }

  public async sendEmail(email: string, token?: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: ' ConnectTatoo - Confirmar cadastro <tcr.thiago@gmail.com>',
      subject: 'Enviando Email com NestJS',
      html: `<p> Olá, seu cadastro na ConnectaTatoo está quase pronta.
      <br> Para ativá-lo, por favor confirme seu endereço de email clicando no link abaixo.
      <br> Sua conta não será ativada até que seu email seja confirmado.
      <br>
      <p><a href="http://localhost/login-tatoo/views/registrationConfirmationCad.html?confirmation_key=${token}">Clique aqui para confirmar seu cadastro no ConnectaTatoo.</a></p>`,
    });
  }
}
