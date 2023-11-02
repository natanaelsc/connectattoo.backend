import { Module } from '@nestjs/common';
import { TattooClientController } from './tattoo-client.controller';
import { TattooClientRepository } from './tattoo-client.repository';
import { TattooClientService } from './tattoo-client.service';

@Module({
  controllers: [TattooClientController],
  providers: [TattooClientRepository, TattooClientService],
  exports: [TattooClientRepository],
})
export class TattooClientModule {}
