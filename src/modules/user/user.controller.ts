import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SignedRequest } from '../auth/interfaces/signed-request.interface';
import { IGetConfirmed } from './interfaces/get-confirmed.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('confirmation')
  async getConfirmedUser(
    @Req() request: SignedRequest,
  ): Promise<IGetConfirmed> {
    return await this.userService.getConfirmedUser(request.user.email);
  }
}
