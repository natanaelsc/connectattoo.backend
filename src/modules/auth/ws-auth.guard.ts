import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtStrategies } from '~/modules/auth/jwt.strategies';
import { JwtAuthPayload } from './interfaces/jwt-auth-payload.interface';
import { UserService } from '../user/user.service';
import { WSAuthBusinessExceptions } from './exceptions/ws-auth-business.exceptions';
import { IGetConfirmed } from '../user/interfaces/get-confirmed.interface';
import { Socket } from 'socket.io';

@Injectable()
export class WSAuthGuard implements CanActivate {
  constructor(
    private jwtStrategies: JwtStrategies,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: Socket = context.switchToWs().getClient();

    const token = this.extractTokenFromHeader(socket);

    let payload: JwtAuthPayload;

    try {
      payload = await this.jwtStrategies.auth.verify(token);
    } catch (e) {
      throw WSAuthBusinessExceptions.invalidTokenException();
    }

    await this.isEmailConfirmed(payload);

    socket['user'] = payload;

    return true;
  }

  private async isEmailConfirmed(payload: JwtAuthPayload): Promise<void> {
    let user: IGetConfirmed;

    try {
      user = await this.userService.getConfirmedUser(payload.userId);
    } catch (e) {
      throw WSAuthBusinessExceptions.userNotFoundException();
    }

    if (!user.emailConfirmed) {
      throw WSAuthBusinessExceptions.emailNotVerifiedException();
    }
  }

  private extractTokenFromHeader(socket: Socket): string {
    const [type, token] =
      socket.handshake.headers.authorization?.split(' ') ?? [];

    if (!token || type !== 'Bearer')
      throw WSAuthBusinessExceptions.invalidTokenException();

    return token;
  }
}
