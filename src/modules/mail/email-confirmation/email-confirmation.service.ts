import { BadRequestException, Injectable } from '@nestjs/common';
import { TattooClientRepository } from 'src/modules/tattoo-client/tattoo-client.repository';
import { MailService } from '../mail.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly mailService: MailService,
    private readonly tattooClientRepository: TattooClientRepository,
  ) {}

  async execute(token: string): Promise<void> {
    const email = await this.mailService.decodeConfirmationToken(token);
    const user = await this.tattooClientRepository.findByEmail(email);
    if (user === null) throw new BadRequestException(`Usuário não encontrado`);
    if (user.isEmailConfirmed === true)
      throw new BadRequestException('Email verificado');
    await this.tattooClientRepository.update({
      id: user.id,
      email,
      isEmailConfirmed: true,
    });
  }
}
