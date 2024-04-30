import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ISignedRequest } from '../auth/interfaces/signed-request.interface';
import { IMeProfile } from './interface/me.interface';
import { IUpdateProfile } from './interface/update-profile.interface';
import { ArrayDuplicatedIndexPipe } from '../../shared/utils/array-duplicated-index.util';
import { ArrayLengthPipe } from '../../shared/utils/array-length.util';
import { IGetTags } from '../tag/interface/get-tags.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateImageDTO } from './dto/update-image.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/me')
  async me(@Req() req: ISignedRequest): Promise<IMeProfile> {
    return await this.profileService.me(req.user.profileId, req.user.userId);
  }

  @Get('tags')
  async getTags(@Req() req: ISignedRequest): Promise<IGetTags[]> {
    return await this.profileService.getTags(req.user.profileId);
  }

  @Post('tags')
  async setTags(
    @Req() req: ISignedRequest,
    @Body(new ArrayLengthPipe(1, 5), ArrayDuplicatedIndexPipe) tags: string[],
  ): Promise<void> {
    await this.profileService.setTags(req.user.profileId, tags);
  }

  @Put('/me')
  async updateMe(
    @Req() req: ISignedRequest,
    @Body() body: IUpdateProfile,
  ): Promise<void> {
    return await this.profileService.updateMe(req.user.profileId, body);
  }

  @Patch('/me/image')
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(
    @Req() req: ISignedRequest,
    @UploadedFile(UpdateImageDTO)
    image: Express.Multer.File,
  ): Promise<void> {
    await this.profileService.updateImage(req.user.profileId, image);
  }
}
