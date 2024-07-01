import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
