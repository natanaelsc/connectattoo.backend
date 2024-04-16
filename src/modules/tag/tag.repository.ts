import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/adapters/prisma/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private prismaService: PrismaService) {}

  async getTagsNames() {
    return await this.prismaService.tag.findMany({
      select: { id: true, name: true },
    });
  }

  async getTagsByIds(tagsIds: string[]) {
    return await this.prismaService.tag.findMany({
      where: { id: { in: tagsIds } },
    });
  }

  async setTagsToProfile(profileId: string, tags: string[]) {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: {
        tags: { connect: tags.map((tag) => ({ id: tag })) },
      },
    });
  }
}
