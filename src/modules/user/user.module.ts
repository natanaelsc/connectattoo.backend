import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [CreateUserController],
  providers: [UserService, CreateUserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
