import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserService } from './create-user/create-user.service';
import { CreateUserController } from './create-user/create-user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, CreateUserController],
  providers: [UserService, AppService, CreateUserService],
  exports: [UserService],
})
export class UserModule {}
