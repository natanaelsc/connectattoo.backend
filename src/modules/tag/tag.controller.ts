import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TagService } from './tag.service';
import { ISignedRequest } from '../auth/interfaces/signed-request.interface';
import { ArrayLengthPipe } from '../../shared/utils/array-length.util';
import { ArrayDuplicatedIndexPipe } from '../../shared/utils/array-duplicated-index.util';
import { IGetTagsNames } from './interface/get-tags-names.interface';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async getTags(): Promise<IGetTagsNames[]> {
    return await this.tagService.getTagsNames();
  }

  @Post()
  async setTagsToProfile(
    @Req() req: ISignedRequest,
    @Body(new ArrayLengthPipe(1, 5), ArrayDuplicatedIndexPipe) tags: string[],
  ): Promise<void> {
    await this.tagService.setTagsToProfile(req.user.profileId, tags);
  }
}
