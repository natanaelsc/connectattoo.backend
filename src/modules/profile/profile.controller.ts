import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ISignedRequest } from '../auth/interfaces/signed-request.interface';
import { IMeProfile } from './interface/me.interface';
import { IUpdateProfile } from './interface/update-profile.interface';
import { ArrayDuplicatedIndexPipe } from '../../shared/utils/array-duplicated-index.util';
import { ArrayLengthPipe } from '../../shared/utils/array-length.util';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/me')
  async me(@Req() req: ISignedRequest): Promise<IMeProfile> {
    return await this.profileService.me(req.user.profileId);
  }

  @Post('tags')
  async setTagsToProfile(
    @Req() req: ISignedRequest,
    @Body(new ArrayLengthPipe(1, 5), ArrayDuplicatedIndexPipe) tags: string[],
  ): Promise<void> {
    await this.profileService.setTagsToProfile(req.user.profileId, tags);
  }

  @Put('/me')
  async updateMe(
    @Req() req: ISignedRequest,
    @Body() body: IUpdateProfile,
  ): Promise<void> {
    return await this.profileService.updateMe(req.user.profileId, body);
  }
}
