import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [CreateUserController],
  providers: [UserService, AppService, CreateUserService],
  exports: [UserService],
})
export class UserModule {}
