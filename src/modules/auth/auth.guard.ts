import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtStrategies } from '~/modules/auth/jwt.strategies';
import { IS_PUBLIC_KEY } from '~/shared/constants/public.constant';
import { JwtAuthPayload } from './interfaces/jwt-auth-payload.interface';
import { AuthBusinessExceptions } from './exceptions/auth-business.exceptions';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtStrategies: JwtStrategies,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.isPublic(context);

    if (!isPublic) {
      const token = this.extractTokenFromHeader(request);

      const payload = await this.jwtStrategies.auth.verify(token);

      await this.isEmailConfirmed(payload);

      request['user'] = payload;
    }

    return true;
  }

  private isPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }

  private async isEmailConfirmed(payload: JwtAuthPayload): Promise<void> {
    const user = await this.userService.getConfirmedUser(payload.userId);

    if (!user.emailConfirmed) {
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
