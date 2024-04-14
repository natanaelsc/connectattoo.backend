import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async getTags() {
    return await this.tagService.getTagsNames();
  }
}
