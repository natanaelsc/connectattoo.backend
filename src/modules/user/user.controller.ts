import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userService.create(createUserDto);
    await this.mailService.sendVerificationLink(user.email);
  }

  @IsPublic()
  @Get('/email/confirmation')
  async confirmEmail(@Query('token') token: string) {
    return await this.userService.confirmEmail(token);
  }
}
