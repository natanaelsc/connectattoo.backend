import { Injectable } from '@nestjs/common';
import { ISocket } from './interface/socket.interface';
import { IServer } from './interface/server.interface';
import { WsException } from '@nestjs/websockets';
import { JwtStrategies } from '../auth/jwt.strategies';

@Injectable()
export class ChatService {
  constructor(private jwtStrategies: JwtStrategies) {}

  async handleConnection(client: ISocket, server: IServer) {
    const auth = client.handshake.headers.authorization?.split(' ')[1];

    if (!auth) throw new WsException('Unauthorized');

    const { profileId } = await this.jwtStrategies.auth.verify(auth);

    client.profileId = profileId;

    server.profiles.set(client.profileId, client.id);
  }

  handleDisconnect(client: ISocket, server: IServer) {
    server.profiles.delete(client.profileId);
  }
}
