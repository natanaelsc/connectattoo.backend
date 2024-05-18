import { Injectable } from '@nestjs/common';
import { IMeProfile } from './interface/me.interface';
import { ProfileRepository } from './profile.repository';
import { ProfileBusinessExceptions } from './exceptions/profile-business.exceptions';
import { ICreateProfile } from './interface/create-profile.interface';
import { Profile } from '@prisma/client';
import { IUpdateProfile } from './interface/update-profile.interface';
import { TagService } from '../tag/tag.service';
import { IGetTags } from '../tag/interface/get-tags.interface';
import { StorageService } from '../../shared/adapters/storage/storage.service';
import { AuthBusinessExceptions } from '../auth/exceptions/auth-business.exceptions';

@Injectable()
export class ProfileService {
  constructor(
    private profileRepository: ProfileRepository,
    private tagService: TagService,
    private storageService: StorageService,
  ) {}

  async me(profileId: string): Promise<IMeProfile> {
    const profile = await this.profileRepository.getProfileWithTags(profileId);

    if (!profile) throw ProfileBusinessExceptions.profileNotFoundException();

    const profileAndUser =
      await this.profileRepository.getProfileWithUser(profileId);

    if (!profileAndUser) throw AuthBusinessExceptions.userNotFoundException();

    const storageUrl =
      process.env.NODE_ENV != 'production'
        ? `${process.env.STORAGE_PUB_DEV}`
        : `${process.env.STORAGE_ENDPOINT}/${process.env.STORAGE_BUCKET}`;

    return {
      displayName: profile.name,
      username: profile.username,
      email: profileAndUser.user?.email ?? '',
      birthDate: profile.birthDate,
      imageProfile: profile.imageProfileKey
        ? `${storageUrl}/${profile.imageProfileKey}`
        : null,
      tags: profile.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      appointment: {}, //será implementado
      galleries: [
        {
          id: '6524a08f-a04d-4bc2-97f4-c975a329ed29',
          name: 'Animais Cartoon',
          cover:
            'https://pub-777ce89a8a3641429d92a32c49eac191.r2.dev/galleries%2FAnimais%20Cartoon.jpg',
        },
        {
          id: '535c2bc1-46b8-47e2-84ee-ac3dd4cead1f',
          name: 'Caveiras',
          cover:
            'https://pub-777ce89a8a3641429d92a32c49eac191.r2.dev/galleries%2FCaveiras.png',
        },
        {
          id: '5e880889-8093-4b31-82c9-f331ce8fc92e',
          name: 'Mãos',
          cover:
            'https://pub-777ce89a8a3641429d92a32c49eac191.r2.dev/galleries%2FM%C3%A3os.jpg',
        },
        {
          id: 'd8c7cf42-184f-4d03-906d-6b4daa8bc72a',
          name: 'Costas Fechadas',
          cover:
            'https://pub-777ce89a8a3641429d92a32c49eac191.r2.dev/galleries%2FCostas%20Fechadas.jpg',
        },
      ],
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

  async updateImage(
    profileId: string,
    image: Express.Multer.File,
  ): Promise<void> {
    const profile = await this.profileRepository.getProfileById(profileId);

    if (!profile) {
      throw ProfileBusinessExceptions.profileNotFoundException();
    }

    const upload = await this.storageService.uploadFile(
      'profile',
      `${profile.id}.${image.originalname.split('.')[1]}`,
      image.buffer,
    );

    await this.profileRepository.setImage(profileId, upload.key);
  }

  async deleteImage(profileId: string): Promise<void> {
    const profile = await this.profileRepository.getProfileById(profileId);

    if (!profile) {
      throw ProfileBusinessExceptions.profileNotFoundException();
    }

    if (!profile.imageProfileKey)
      throw ProfileBusinessExceptions.imageProfileNotFoundException();

    await this.storageService.deleteFile(profile.imageProfileKey);

    await this.profileRepository.setImage(profileId, null);
  }

  async getTags(profileId: string): Promise<IGetTags[]> {
    const profile = await this.profileRepository.getProfileById(profileId);

    if (!profile) throw ProfileBusinessExceptions.profileNotFoundException();

    return await this.profileRepository.getTags(profileId);
  }

  async setTags(profileId: string, tags: string[]): Promise<void> {
    await this.tagService.validateTags(tags);

    await this.profileRepository.setTags(profileId, tags);
  }

  async vinculateRandomTags(profileId: string) {
    const tags = await this.tagService.generateRandomTags();

    await this.profileRepository.setTags(profileId, Array.from(tags));
  }
}
