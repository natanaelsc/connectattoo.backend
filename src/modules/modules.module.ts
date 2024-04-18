import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, ProfileModule, TagModule, LocationModule],
  exports: [AuthModule, UserModule, ProfileModule, TagModule, LocationModule],
})
export class ModulesModule {}
