import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { IGetTagsNames } from './interface/get-tags-names.interface';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async getTags(): Promise<IGetTagsNames[]> {
    return await this.tagService.getTagsNames();
  }
}
