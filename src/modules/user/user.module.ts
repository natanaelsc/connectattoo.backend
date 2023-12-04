import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/shared/adapters/prisma/prisma.module';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
