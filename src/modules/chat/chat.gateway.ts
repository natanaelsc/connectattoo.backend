import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IGatewayConnection } from './interface/gateway-connection.interface';
import { ISocket } from './interface/socket.interface';
import { ChatService } from './chat.service';
import { IServer } from './interface/server.interface';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements IGatewayConnection {
  @WebSocketServer()
  private server: IServer;

  constructor(private chatService: ChatService) {}

  handleConnection(client: ISocket): void {
    if (!this.server?.profiles) {
      this.server.profiles = new Map<string, string>();
    }

    this.chatService.handleConnection(client, this.server);
  }

  handleDisconnect(client: ISocket): void {
    this.chatService.handleConnection(client, this.server);
  }

  @SubscribeMessage('health')
  healthCheck(): { health: string } {
    return { health: 'Chat is up and running' };
  }
}
