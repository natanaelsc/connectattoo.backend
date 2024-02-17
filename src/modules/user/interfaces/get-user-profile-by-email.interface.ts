import { User, Profile } from '@prisma/client';
import { Nullable } from '~/shared/interface/nullable.type';

export type IGetUserAndProfileByEmail = Nullable<
  User & { profile: Nullable<Profile> }
>;
