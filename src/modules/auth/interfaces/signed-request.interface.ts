import { Request } from 'express';
import { JwtAuthPayload } from './jwt-auth-payload.interface';

export interface ISignedRequest extends Request {
  user: JwtAuthPayload;
}
