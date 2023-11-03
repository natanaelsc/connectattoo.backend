import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TattooArtistController } from './tattoo-artist.controller';
import { TattooArtistRepository } from './tattoo-artist.repository';
import { TattooArtistService } from './tattoo-artist.service';

@Module({
  imports: [forwardRef(() => AuthModule), UserModule],
  providers: [TattooArtistService, TattooArtistRepository],
  controllers: [TattooArtistController],
})
export class TattooArtistModule {}
