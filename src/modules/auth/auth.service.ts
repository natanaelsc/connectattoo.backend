import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { UserLoginDto } from './dtos/user-login.dto';
import { AccountType } from './enums/account-type.enum';
import { Payload } from './interfaces/payload.interface';
import { UserToken } from './interfaces/user-token.interface';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<UserToken> {
    const { email, password } = userLoginDto;
    const payload = await this.validate(email, password);
    delete userLoginDto.password;
    const userToken = await this.jwtStrategy.getUserToken(payload);
    return userToken;
  }

  async validate(email: string, password: string): Promise<Payload> {
    const user = await this.userRepository.findByEmail(email);
    if (user === null) throw new UnauthorizedException('Credenciais inválidas');
    if (user.isEmailConfirmed === false) {
      throw new UnauthorizedException('Usuário não verificado');
    }
    await this.checkPassword(password, user.password);
    const payload: Payload = {
      sub: user.id,
      email: user.email,
      type: AccountType.CLIENT,
    };
    return payload;
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
