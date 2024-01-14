import { Injectable } from '@nestjs/common';
import { IMeProfile } from './interface/me.interface';
import { ageCalculator } from '~/shared/utils/age-calculator.util';
import { ProfileRepository } from './profile.repository';
import { ProfileBusinessExceptions } from './exceptions/profile-business.exceptions';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async me(profileId: string): Promise<IMeProfile> {
    const profile = await this.profileRepository.getProfileById(profileId);

    if (!profile) throw ProfileBusinessExceptions.profileNotFoundException();

    return {
      displayName: `${profile.firstName} ${profile.lastName}`,
      username: profile.email.split('@')[0],
      age: ageCalculator(new Date(profile.birthDate)),
      imageProfile: {}, //será implementado
      interests: ['old school', 'preto e branco', 'geometrico'],
      appointment: {}, //será implementado
    };
  }
}
