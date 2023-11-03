import { Controller, Get, Query } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('/email')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmation: EmailConfirmationService) {}

  @Get('/confirmation')
  async confirmEmail(@Query('token') token: string): Promise<void> {
    await this.emailConfirmation.execute(token);
  }
}
