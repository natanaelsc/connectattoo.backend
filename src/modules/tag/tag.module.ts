import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/adapters/prisma/prisma.module';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagService, TagRepository],
})
export class TagModule {}
