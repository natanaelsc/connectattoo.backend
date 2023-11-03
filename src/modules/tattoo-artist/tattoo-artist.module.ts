import { Module } from '@nestjs/common';
import { TattooArtistController } from './tattoo-artist.controller';
import { TattooArtistRepository } from './tattoo-artist.repository';
import { TattooArtistService } from './tattoo-artist.service';

@Module({
  providers: [TattooArtistService, TattooArtistRepository],
  controllers: [TattooArtistController],
})
export class TattooArtistModule {}
