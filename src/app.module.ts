import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { TattooArtistModule } from './modules/tattoo-artist/tattoo-artist.module';
import { TattooClientModule } from './modules/tattoo-client/tattoo-client.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    TattooClientModule,
    TattooArtistModule,
    UserModule,
  ],
})
export class AppModule {}
