import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { EmailConfirmationService } from 'src/modules/mail/email-confirmation/email-confirmation.service';
import { CreateUserDto } from './create-user.dto';
import { CreateUserService } from './create-user.service';

@Controller('users')
export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = await this.createUserService.create(createUserDto);
    await this.emailConfirmationService.sendVerificationLink(user.email);
  }
}
