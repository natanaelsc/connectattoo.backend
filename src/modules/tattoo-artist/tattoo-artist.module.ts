import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TattooArtistController } from './tattoo-artist.controller';
import { TattooArtistRepository } from './tattoo-artist.repository';
import { TattooArtistService } from './tattoo-artist.service';
import { PrismaModule } from 'src/shared/adapters/prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  providers: [TattooArtistService, TattooArtistRepository],
  controllers: [TattooArtistController],
})
export class TattooArtistModule {}
