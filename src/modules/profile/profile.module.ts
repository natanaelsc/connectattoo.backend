import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { PrismaModule } from '~/shared/adapters/prisma/prisma.module';
import { TagModule } from '../tag/tag.module';
import { StorageModule } from '../../shared/adapters/storage/storage.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, TagModule, StorageModule, UserModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
