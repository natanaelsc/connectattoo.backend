import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { TattooArtistModule } from './modules/tattoo-artist/tattoo-artist.module';
import { TattooClientModule } from './modules/tattoo-client/tattoo-client.module';
import { UserModule } from './modules/user/user.module';
import { AdapterModule } from './shared/adapters/adapter.module';

@Module({
  imports: [
    AdapterModule,
    AuthModule,
    MailModule,
    TattooClientModule,
    TattooArtistModule,
    UserModule,
  ],
})
export class AppModule {}
