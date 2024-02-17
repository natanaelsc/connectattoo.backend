import { Profile, Tag, ImageProfile } from '@prisma/client';
import { Nullable } from '~/shared/interface/nullable.type';

export type getProfileWithTagsAndImageProfileType = Nullable<
  Profile & { tags: Tag[]; imageProfile: Nullable<ImageProfile> }
>;
