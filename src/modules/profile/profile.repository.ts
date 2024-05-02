import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { getProfileAndUserEmailType } from './interface/get-profile-with-user-email';
import { PrismaService } from '~/shared/adapters/prisma/prisma.service';
import { Nullable } from '~/shared/interface/nullable.type';
import { ICreateProfile } from './interface/create-profile.interface';
import { getProfileWithTagsAndImageProfileType } from './interface/get-profile-with-tags-and-image-profile.interface.';
import { IUpdateProfile } from './interface/update-profile.interface';

@Injectable()
export class ProfileRepository {
  constructor(private prismaService: PrismaService) {}

  async getProfileById(profileId: string): Promise<Nullable<Profile>> {
    return await this.prismaService.profile.findFirst({
      where: { id: profileId },
    });
  }

  async getProfileByUserId(userId: string): Promise<Nullable<Profile>> {
    return await this.prismaService.profile.findFirst({
      where: { user: { id: userId } },
    });
  }

  async getProfileAndUser(
    profileId: string,
  ): Promise<getProfileAndUserEmailType> {
    return await this.prismaService.profile.findFirst({
      where: { id: profileId },
      include: { user: true },
    });
  }

  async create(data: ICreateProfile, userId: string): Promise<Profile> {
    return await this.prismaService.profile.create({
      data: {
        name: data.name,
        username: data.username,
        birthDate: data.birthDate,
        user: { connect: { id: userId } },
      },
    });
  }

  async getProfileWithTagsAndImageProfile(
    profileId: string,
  ): Promise<getProfileWithTagsAndImageProfileType> {
    return await this.prismaService.profile.findFirst({
      where: { id: profileId },
      include: { tags: true, imageProfile: true },
    });
  }

  async updateProfile(
    profileId: string,
    data: IUpdateProfile,
  ): Promise<Profile> {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: {
        name: data.displayName,
        username: data.username,
        birthDate: data.birthDate,
      },
    });
  }

  async setImage(profileId: string, key: string, imageSize: number) {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: {
        imageProfile: {
          upsert: {
            update: { size: imageSize, url: key },
            create: { heigth: 0, width: 0, size: imageSize, url: key },
          },
        },
      },
    });
  }

  async getTags(profileId: string) {
    const profile = await this.prismaService.profile.findFirstOrThrow({
      where: { id: profileId },
      select: { tags: { select: { id: true, name: true } } },
    });

    return profile.tags;
  }

  async setTags(profileId: string, tags: string[]) {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: {
        tags: { connect: tags.map((tag) => ({ id: tag })) },
      },
    });
  }
}
