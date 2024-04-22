import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { TagBusinessExceptions } from './exceptions/profile-business.exceptions';
import { IGetTags } from './interface/get-tags.interface';

@Injectable()
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async getTags(): Promise<IGetTags[]> {
    return await this.tagRepository.getTagsNames();
  }

  async validateTags(tags: string[]): Promise<void> {
    const profileTags = await this.tagRepository.getTagsByIds(tags);

    if (profileTags.length !== tags.length) {
      throw TagBusinessExceptions.tagsNotFoundException();
    }
  }

  async generateRandomTags(): Promise<Set<string>> {
    const tags = await this.tagRepository.getTagsNames();

    const set = new Set<string>();

    while (set.size < 5) {
      const min = 0;
      const max = tags.length - 1;
      const value = Math.floor(Math.random() * (max - min + 1)) + min;
      set.add(tags[value].id);
    }

    return set;
  }
}
