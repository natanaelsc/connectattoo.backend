import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtStrategies } from '~/modules/auth/jwt.strategies';
import { IS_PUBLIC_KEY } from '~/shared/constants/public.constant';
import { JwtAuthPayload } from './interfaces/jwt-auth-payload.interface';
import { AuthBusinessExceptions } from './exceptions/auth-business.exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtStrategies: JwtStrategies,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.isPublic(context);

    if (isPublic) return true;

    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtStrategies.auth.verify(token);

    this.isEmailConfirmed(payload);

    request['user'] = payload;

    return true;
  }

  private isPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }

  private isEmailConfirmed(payload: JwtAuthPayload): void {
    if (!payload.isEmailConfirmed) {
      throw AuthBusinessExceptions.emailNotVerifiedException();
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token || type !== 'Bearer')
      throw AuthBusinessExceptions.invalidTokenException();

    return token;
  }
}
