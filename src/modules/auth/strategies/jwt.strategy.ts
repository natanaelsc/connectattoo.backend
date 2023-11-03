import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/payload.interface';
import { UserToken } from '../interfaces/user-token.interface';

@Injectable()
export class JwtStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async getUserToken(payload: Payload): Promise<UserToken> {
    const access_token = await this.jwtService.signAsync(payload);
    const userToken: UserToken = { access_token };
    return userToken;
  }

  async getPayload(token: string): Promise<Payload> {
    const payload: Payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return payload;
  }
}
