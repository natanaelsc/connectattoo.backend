import { Body, Controller, Post } from '@nestjs/common';
import { UserToken } from '../auth/auth.interface';
import { AuthService } from '../auth/auth.service';
import { UserType } from '../auth/enums/user-type.enum';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './tattoo-client.dto';
import { TattooClientService } from './tattoo-client.service';

@Controller('/clients')
export class TattooClientController {
  constructor(
    private readonly tattooClientService: TattooClientService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserToken> {
    const user = await this.tattooClientService.create(createUserDto);
    await this.mailService.sendVerificationLink(user.email);
    const userToken = await this.authService.generateToken({
      id: user.id,
      email: user.email,
      type: UserType.CLIENT,
    });
    return userToken;
  }
}
