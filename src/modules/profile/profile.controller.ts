import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SignedRequest } from '../auth/interfaces/signed-request.interface';
import { IMeProfile } from './interface/me.interface';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/me')
  async me(@Req() req: SignedRequest): Promise<IMeProfile> {
    return await this.profileService.me(req.user.userId);
  }
}
