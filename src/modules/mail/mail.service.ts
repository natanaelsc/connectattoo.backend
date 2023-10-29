import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(mailDto: MailDto): Promise<void> {
    await this.mailerService.sendMail({
      from: `"Connectattoo" <${process.env.MAILDEV_FROM}>`,
      to: mailDto.email,
      subject: mailDto.subject,
      html: mailDto.html,
    });
  }
}
