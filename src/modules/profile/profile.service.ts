import { Injectable } from '@nestjs/common';
import { IMeProfile } from './interface/me.interface';
import { ageCalculator } from '~/shared/utils/age-calculator.util';
import { ProfileRepository } from './profile.repository';
import { ProfileBusinessExceptions } from './exceptions/profile-business.exceptions';
import { ICreateProfile } from './interface/create-profile.interface';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

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
}
