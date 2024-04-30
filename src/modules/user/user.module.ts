import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/shared/adapters/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { MapsModule } from '../../shared/adapters/maps/maps.module';

@Module({
  imports: [PrismaModule, MapsModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
