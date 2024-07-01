import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IGatewayConnection } from './interface/gateway-connection.interface';
import { ISocket } from './interface/socket.interface';
import { ChatService } from './chat.service';
import { IServer } from './interface/server.interface';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WSAuthGuard } from '../auth/ws-auth.guard';
import { WSExceptionFilter } from '../../shared/interceptor/ws-exception-filter.interface';

@WebSocketGateway({ namespace: 'chat' })
@UseGuards(WSAuthGuard)
@UseFilters(WSExceptionFilter)
export class ChatGateway implements IGatewayConnection {
  @WebSocketServer()
  private server: IServer;

  constructor(private chatService: ChatService) {}

  async handleConnection(client: ISocket): Promise<void> {
    if (!this.server?.profiles) {
      this.server.profiles = new Map<string, string>();
    }

    await this.chatService.handleConnection(client, this.server);
  }

  handleDisconnect(client: ISocket): void {
    this.chatService.handleDisconnect(client, this.server);
  }

  @SubscribeMessage('health')
  healthCheck(): { health: string } {
    return { health: 'Chat is up and running' };
  }
}
