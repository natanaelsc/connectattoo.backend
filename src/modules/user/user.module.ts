import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { PrismaModule } from 'src/shared/adapters/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
