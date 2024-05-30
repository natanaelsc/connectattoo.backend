import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '~/shared/adapters/prisma/prisma.service';
import { Nullable } from '~/shared/interface/nullable.type';
import { ICreateProfile } from './interface/create-profile.interface';
import { getProfileWithTagsType } from './interface/get-profile-with-tags-and-image-profile.interface.';
import { IUpdateProfile } from './interface/update-profile.interface';
import { getProfileWithUserType } from './interface/get-profile-with-user';
import { IPatchProfile } from './interface/patch-profile.interface';

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

  async getProfileWithUser(profileId: string): Promise<getProfileWithUserType> {
    return await this.prismaService.profile.findFirst({
      where: { id: profileId },
      include: { user: true },
    });
  }

  async getProfileByUsernameOrEmail(
    data: IPatchProfile,
  ): Promise<getProfileWithUserType[]> {
    return await this.prismaService.profile.findMany({
      include: { user: true },
      where: {
        OR: [
          {
            username: { equals: data.username },
          },
          {
            user: {
              email: data.email,
            },
          },
        ],
      },
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

  async getProfileWithTags(profileId: string): Promise<getProfileWithTagsType> {
    return await this.prismaService.profile.findFirst({
      where: { id: profileId },
      include: { tags: true },
    });
  }

  async updateProfile(
    profileId: string,
    data: IUpdateProfile,
  ): Promise<Profile> {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: {
        name: data.name,
        username: data.username,
        birthDate: data.birthDate,
      },
    });
  }

  async patchProfile(profileId: string, data: IPatchProfile): Promise<Profile> {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: {
        name: data.name,
        username: data.username,
        user: {
          update: {
            email: data.email,
          },
        },
        birthDate: data.birthDate,
      },
    });
  }

  async setImage(profileId: string, key: Nullable<string>) {
    return await this.prismaService.profile.update({
      where: { id: profileId },
      data: { imageProfileKey: key },
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
