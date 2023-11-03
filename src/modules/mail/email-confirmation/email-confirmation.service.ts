import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';
import { MailService } from '../mail.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(token: string): Promise<void> {
    const email = await this.mailService.decodeConfirmationToken(token);
    const user = await this.userRepository.findByEmail(email);
    if (user === null) throw new BadRequestException(`Usuário não encontrado`);
    if (user.isEmailConfirmed === true) {
      throw new BadRequestException('Email verificado');
    }
    await this.userRepository.update({
      id: user.id,
      email,
      isEmailConfirmed: true,
    });
  }
}
