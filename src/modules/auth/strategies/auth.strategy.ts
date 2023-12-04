import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtSignature } from '../interfaces/jwt-signature.interface';

@Injectable()
export class AuthStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: JwtPayload): Promise<JwtSignature> {
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async verify(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync(token);
  }
}
