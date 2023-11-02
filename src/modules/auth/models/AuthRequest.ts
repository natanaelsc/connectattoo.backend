import { Request } from 'express';
import { TattooClient } from 'src/modules/tattoo-client/tattoo-client';

export interface AuthRequest extends Request {
  user: TattooClient;
}
