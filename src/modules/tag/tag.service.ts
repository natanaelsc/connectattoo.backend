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
}
