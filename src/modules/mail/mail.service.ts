import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(mailDto: MailDto): Promise<void> {
    await this.mailerService.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: mailDto.email,
      subject: mailDto.subject,
      html: mailDto.html,
    });
  }
}
