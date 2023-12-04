import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './strategies/auth.strategy';
import { MailStrategy } from './strategies/mail.strategy';
import { MailModule } from '~/shared/adapters/mail/mail.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MailModule,
  ],
  providers: [AuthService, AuthStrategy, MailStrategy],
  controllers: [AuthController],
  exports: [AuthStrategy],
})
export class AuthModule {}
