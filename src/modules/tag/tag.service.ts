import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { TagBusinessExceptions } from './exceptions/profile-business.exceptions';
import { IGetTagsNames } from './interface/get-tags-names.interface';

@Injectable()
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async getTagsNames(): Promise<IGetTagsNames[]> {
    return await this.tagRepository.getTagsNames();
  }

  async validateTags(tags: string[]): Promise<void> {
    const profileTags = await this.tagRepository.getTagsByIds(tags);

    if (profileTags.length !== tags.length) {
      throw TagBusinessExceptions.tagsNotFoundException();
    }
  }
}
