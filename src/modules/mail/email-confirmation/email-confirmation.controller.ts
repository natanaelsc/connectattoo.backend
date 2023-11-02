import { Controller, Get, Query } from '@nestjs/common';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('/email')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmation: EmailConfirmationService) {}

  @IsPublic()
  @Get('/confirmation')
  async confirmEmail(@Query('token') token: string) {
    return await this.emailConfirmation.execute(token);
  }
}
