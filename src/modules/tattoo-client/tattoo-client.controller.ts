import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './tattoo-client.dto';
import { TattooClientService } from './tattoo-client.service';

@Controller('/clients')
export class TattooClientController {
  constructor(
    private readonly tattooClientService: TattooClientService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = await this.tattooClientService.create(createUserDto);
    await this.mailService.sendVerificationLink(user.email);
  }
}
