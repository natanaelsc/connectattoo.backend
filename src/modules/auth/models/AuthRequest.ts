import { Request } from 'express';
import { User } from 'src/modules/user/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
