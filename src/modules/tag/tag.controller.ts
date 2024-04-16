import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { IGetTags } from './interface/get-tags.interface';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async getTags(): Promise<IGetTags[]> {
    return await this.tagService.getTags();
  }
}
