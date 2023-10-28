import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly useService: UserService,
    private readonly appService: AppService,
  ) {}

  @Get('me')
  getMe(@CurrentUser() user: User): User {
    return user;
  }

  @IsPublic()
  @Post('sendEmail')
  sendEmail(@Request() req) {
    return this.appService.sendEmail(req.body.email);
  }

  @IsPublic()
  @Post('url')
  async getConfirmation_key(@Body() url) {
    return this.appService.getConfirmation_key(url);
  }
}
