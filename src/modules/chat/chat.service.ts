import { Injectable } from '@nestjs/common';
import { ISocket } from './interface/socket.interface';
import { IServer } from './interface/server.interface';

@Injectable()
export class ChatService {
  handleConnection(client: ISocket, server: IServer) {
    const auth = client.handshake.query.profile as string;

    if (!auth) throw new Error('Unauthorized');

    client.profileId = auth;

    server.profiles.set(client.profileId, client.id);
  }

  handleDisconnect(client: ISocket, server: IServer) {
    server.profiles.delete(client.profileId);
  }
}
