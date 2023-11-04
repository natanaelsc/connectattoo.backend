import { Body, Controller, Post } from '@nestjs/common';
import { AccountType } from '../auth/enums/account-type.enum';
import { UserToken } from '../auth/interfaces/user-token.interface';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { MailService } from '../mail/mail.service';
import { CreateUserArtistDto } from './dtos/create-user-artist.dto';
import { TattooArtistService } from './tattoo-artist.service';

@Controller('/users/artist')
export class TattooArtistController {
  constructor(
    private readonly tattooArtistService: TattooArtistService,
    private readonly mailService: MailService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post()
  async create(
    @Body() createUserArtistDto: CreateUserArtistDto,
  ): Promise<UserToken> {
    const user = await this.tattooArtistService.create(createUserArtistDto);
    delete createUserArtistDto.password;
    await this.mailService.sendVerificationLink(user.email);
    const userToken = await this.jwtStrategy.getUserToken({
      sub: user.id,
      email: user.email,
      type: AccountType.ARTIST,
    });
    return userToken;
  }
}
