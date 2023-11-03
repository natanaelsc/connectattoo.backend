import { Body, Controller, Post } from '@nestjs/common';
import { AccountType } from '../auth/enums/account-type.enum';
import { UserToken } from '../auth/interfaces/user-token.interface';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { JwtStrategy } from './../auth/strategies/jwt.strategy';
import { TattooClientService } from './tattoo-client.service';

@Controller('/users/client')
export class TattooClientController {
  constructor(
    private readonly tattooClientService: TattooClientService,
    private readonly mailService: MailService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserToken> {
    const user = await this.tattooClientService.create(createUserDto);
    delete createUserDto.password;
    await this.mailService.sendVerificationLink(user.email);
    const userToken = await this.jwtStrategy.getUserToken({
      sub: user.id,
      email: user.email,
      type: AccountType.CLIENT,
    });
    return userToken;
  }
}
