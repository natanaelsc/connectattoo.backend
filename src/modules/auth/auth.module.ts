import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '~/shared/adapters/mail/mail.module';
import { JwtStrategies } from './jwt.strategies';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [UserModule, JwtModule, MailModule, ProfileModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategies,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [JwtStrategies],
})
export class AuthModule {}
