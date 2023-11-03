import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TattooClientRepository } from '../tattoo-client/tattoo-client.repository';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserType } from './enums/user-type.enum';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserToken } from './interfaces/user-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly tattooClientRepository: TattooClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<UserToken> {
    const tokenPayload = await this.generatePayload(userLoginDto);
    delete userLoginDto.password;
    const userToken = await this.generateToken(tokenPayload);
    return userToken;
  }

  async generatePayload(userLoginDto: UserLoginDto): Promise<TokenPayload> {
    const user = await this.tattooClientRepository.findByEmail(
      userLoginDto.email,
    );

    if (user === null) throw new UnauthorizedException('Credenciais inválidas');

    if (user.isEmailConfirmed === false) {
      throw new UnauthorizedException('Usuário não verificado');
    }

    await this.checkPassword(userLoginDto.password, user.password);

    const tokenPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
      type: UserType.CLIENT,
    };

    return tokenPayload;
  }

  async generateToken(tokenPayload: TokenPayload): Promise<UserToken> {
    const userToken: UserToken = {
      access_token: this.jwtService.sign(tokenPayload),
    };
    return userToken;
  }

  private async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (isPasswordMatching === false)
      throw new UnauthorizedException('Credenciais inválidas');

    return isPasswordMatching;
  }
}
