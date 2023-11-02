import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { TattooClientController } from './tattoo-client.controller';
import { TattooClientRepository } from './tattoo-client.repository';
import { TattooClientService } from './tattoo-client.service';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [TattooClientController],
  providers: [TattooClientRepository, TattooClientService],
  exports: [TattooClientRepository],
})
export class TattooClientModule {}
