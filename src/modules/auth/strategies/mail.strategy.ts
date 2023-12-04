import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignature } from '../interfaces/jwt-signature.interface';
import { JwtMailPayload } from '../interfaces/jwt-mail-payload.interface';

@Injectable()
export class MailStrategy {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: { email: string }): Promise<JwtSignature> {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.EMAIL_CONFIRMATION_SECRET_KEY,
        expiresIn: process.env.EMAIL_CONFIRMATION_EXPIRES_IN,
      }),
    };
  }

  async verify(token: string): Promise<JwtMailPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.EMAIL_CONFIRMATION_SECRET_KEY,
    });
  }
}
