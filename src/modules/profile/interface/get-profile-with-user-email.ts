import { Profile, User } from '@prisma/client';
import { Nullable } from '~/shared/interface/nullable.type';

export type getProfileAndUserEmailType = Nullable<
  Profile & { user: Nullable<User> }
>;
