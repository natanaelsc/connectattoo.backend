import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TattooClientController } from './tattoo-client.controller';
import { TattooClientRepository } from './tattoo-client.repository';
import { TattooClientService } from './tattoo-client.service';
import { PrismaModule } from 'src/shared/adapters/prisma/prisma.module';

@Module({
  imports: [ AuthModule, UserModule, PrismaModule],
  controllers: [TattooClientController],
  providers: [TattooClientRepository, TattooClientService],
  exports: [TattooClientRepository],
})
export class TattooClientModule {}
