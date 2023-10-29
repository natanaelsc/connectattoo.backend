import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { GetUserService } from './get-user/get-user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [CreateUserController],
  providers: [CreateUserService, UserRepository, GetUserService],
  exports: [UserRepository, GetUserService],
})
export class UserModule {}
