import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { IGetTagsNames } from './interface/get-tags-names.interface';

@Injectable()
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async getTagsNames(): Promise<IGetTagsNames[]> {
    return await this.tagRepository.getTagsNames();
  }
}
