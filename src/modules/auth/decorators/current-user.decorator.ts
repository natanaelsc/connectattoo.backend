import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TattooClient } from 'src/modules/tattoo-client/tattoo-client';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): TattooClient => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
