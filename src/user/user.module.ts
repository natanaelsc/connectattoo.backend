import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AppService } from '../app.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, AppService],
  exports: [UserService],
})
export class UserModule {}
