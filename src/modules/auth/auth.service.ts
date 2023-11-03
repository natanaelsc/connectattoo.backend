import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TattooClientRepository } from '../tattoo-client/tattoo-client.repository';
import { UserLoginDto, UserPayload, UserToken, UserType } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tattooClientRepository: TattooClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<UserToken> {
    const user = await this.validate(userLoginDto.email, userLoginDto.password);

    delete userLoginDto.password;

    const payload: UserPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };

    const userToken: UserToken = {
      access_token: this.jwtService.sign(payload),
    };

    return userToken;
  }

  async validate(email: string, password: string) {
    const user = await this.tattooClientRepository.findByEmail(email);

    if (user === null) throw new BadRequestException('Credenciais inválidas');

    if (user.isEmailConfirmed === false) {
      throw new BadRequestException(
        'Usuário não verificado, por favor verifique seu e-mail',
      );
    }

    await this.verifyPassword(password, user.password);

    const validUser: ValidUser = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      type: UserType.CLIENT,
    };

    return validUser;
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (isPasswordMatching === false)
      throw new BadRequestException('Credenciais inválidas');

    return isPasswordMatching;
  }
}

class ValidUser {
  id: string;
  email: string;
  name: string;
  type: string;
}
