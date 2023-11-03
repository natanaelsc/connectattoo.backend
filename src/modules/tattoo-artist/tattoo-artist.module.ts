import { Module } from '@nestjs/common';
import { TattooArtistService } from './tattoo-artist.service';
import { TattooArtistController } from './tattoo-artist.controller';

@Module({
  providers: [TattooArtistService],
  controllers: [TattooArtistController]
})
export class TattooArtistModule {}
