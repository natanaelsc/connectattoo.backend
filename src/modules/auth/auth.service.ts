import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TattooClientRepository } from '../tattoo-client/tattoo-client.repository';
import { TokenPayload, UserToken } from './auth.interface';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserType } from './enums/user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly tattooClientRepository: TattooClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<UserToken> {
    const user = await this.validate(userLoginDto.email, userLoginDto.password);
    delete userLoginDto.password;
    const userToken = await this.generateToken(user);
    return userToken;
  }

  async validate(email: string, password: string): Promise<ValidUser> {
    const user = await this.tattooClientRepository.findByEmail(email);

    if (user === null) throw new UnauthorizedException('Credenciais inválidas');

    if (user.isEmailConfirmed === false) {
      throw new UnauthorizedException('Usuário não verificado');
    }

    await this.checkPassword(password, user.password);

    const validUser: ValidUser = {
      id: user.id,
      email: user.email,
      type: UserType.CLIENT,
    };

    return validUser;
  }

  async generateToken(user: ValidUser): Promise<UserToken> {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      type: user.type,
    };

    const userToken: UserToken = {
      access_token: this.jwtService.sign(payload),
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

class ValidUser {
  id: string;
  email: string;
  type: string;
}
