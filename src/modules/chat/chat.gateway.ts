import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { IGatewayConnection } from './interface/gateway-connection.interface';
import { ISocket } from './interface/socket.interface';
import { ChatService } from './chat.service';
import { IServer } from './interface/server.interface';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements IGatewayConnection {
  @WebSocketServer()
  private server: IServer;

  constructor(private chatService: ChatService) {
    this.server['profiles'] = new Map<string, string>();
  }

  handleConnection(client: ISocket): void {
    this.chatService.handleConnection(client, this.server);
  }

  handleDisconnect(client: ISocket): void {
    this.chatService.handleConnection(client, this.server);
  }
}
