import { Request } from 'express';
import { User } from 'src/modules/user/user.interface';

export interface AuthRequest extends Request {
  user: User;
}
