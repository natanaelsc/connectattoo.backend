import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ISignedRequest } from '../auth/interfaces/signed-request.interface';
import { IMeProfile } from './interface/me.interface';
import { IUpdateProfile } from './interface/update-profile.interface';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/me')
  async me(@Req() req: ISignedRequest): Promise<IMeProfile> {
    return await this.profileService.me(req.user.profileId);
  }

  @Put('/me')
  async updateMe(
    @Req() req: ISignedRequest,
    @Body() body: IUpdateProfile,
  ): Promise<void> {
    return await this.profileService.updateMe(req.user.profileId, body);
  }
}
