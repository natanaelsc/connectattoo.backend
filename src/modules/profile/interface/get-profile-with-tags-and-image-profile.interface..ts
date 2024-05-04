import { Profile, Tag } from '@prisma/client';
import { Nullable } from '~/shared/interface/nullable.type';

export type getProfileWithTagsType = Nullable<Profile & { tags: Tag[] }>;
