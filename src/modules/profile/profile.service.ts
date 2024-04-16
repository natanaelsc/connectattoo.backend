import { Injectable } from '@nestjs/common';
import { IMeProfile } from './interface/me.interface';
import { ageCalculator } from '~/shared/utils/age-calculator.util';
import { ProfileRepository } from './profile.repository';
import { ProfileBusinessExceptions } from './exceptions/profile-business.exceptions';
import { ICreateProfile } from './interface/create-profile.interface';
import { Profile } from '@prisma/client';
import { IUpdateProfile } from './interface/update-profile.interface';
import { TagService } from '../tag/tag.service';

@Injectable()
export class ProfileService {
  constructor(
    private profileRepository: ProfileRepository,
    private tagService: TagService,
  ) {}

  async me(profileId: string): Promise<IMeProfile> {
    const profile =
      await this.profileRepository.getProfileWithTagsAndImageProfile(profileId);

    if (!profile) throw ProfileBusinessExceptions.profileNotFoundException();

    return {
      displayName: profile.name,
      username: profile.username,
      age: ageCalculator(new Date(profile.birthDate)),
      imageProfile: profile.imageProfile?.url ?? null,
      interests: profile.tags.map((tag) => tag.name),
      appointment: {}, //será implementado
    };
  }

  async create(data: ICreateProfile, userId: string): Promise<Profile> {
    const profile = await this.profileRepository.getProfileByUserId(userId);

    if (profile)
      throw ProfileBusinessExceptions.profileAlreadyExistsException();

    return await this.profileRepository.create(data, userId);
  }

  async updateMe(profileId: string, body: IUpdateProfile): Promise<void> {
    const profile = await this.profileRepository.getProfileById(profileId);

    if (!profile) {
      throw ProfileBusinessExceptions.profileNotFoundException();
    }

    await this.profileRepository.updateProfile(profileId, body);
  }

  async setTagsToProfile(profileId: string, tags: string[]): Promise<void> {
    await this.tagService.validateTags(tags);

    await this.profileRepository.setTagsToProfile(profileId, tags);
  }
}
