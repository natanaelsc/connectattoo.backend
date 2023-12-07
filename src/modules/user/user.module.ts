import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/shared/adapters/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
