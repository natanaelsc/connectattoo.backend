import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/constants/public.constant';

@Controller()
export class AppController {
  @Public()
  @Get()
  healthCheck() {
    return 'OK';
  }
}
