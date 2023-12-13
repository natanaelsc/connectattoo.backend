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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtStrategies: JwtStrategies,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtStrategies.auth.verify(token);

    request['user'] = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token || type !== 'Bearer') throw new UnauthorizedException();

    return token;
  }
}
