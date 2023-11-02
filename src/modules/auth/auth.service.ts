import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TattooClient } from '../tattoo-client/tattoo-client';
import { TattooClientRepository } from '../tattoo-client/tattoo-client.repository';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly tattooClientRepository: TattooClientRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: TattooClient): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.tattooClientRepository.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email ou senha incorreto');
  }
}
