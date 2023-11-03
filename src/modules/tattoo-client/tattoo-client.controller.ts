import { Body, Controller, Post } from '@nestjs/common';
import { UserType } from '../auth/enums/user-type.enum';
import { UserToken } from '../auth/interfaces/user-token.interface';
import { MailService } from '../mail/mail.service';
import { JwtStrategy } from './../auth/strategies/jwt.strategy';
import { CreateUserDto } from './tattoo-client.dto';
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
      type: UserType.CLIENT,
    });
    return userToken;
  }
}
