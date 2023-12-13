import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtAuthPayload } from './jwt-auth-payload.interface';
import { JwtMailPayload } from './jwt-mail-payload.interface';
import { JwtSignature } from './jwt-signature.interface';

export namespace JwtStrategiesImplementation {
  export type Configure = JwtSignOptions | JwtVerifyOptions;
  export type Payload = JwtMailPayload | JwtAuthPayload;

  type IConfigureStrategy<T> = {
    sign: (payload: T) => Promise<JwtSignature>;
    verify: (token: string) => Promise<T>;
  };

  export interface Interface {
    auth: IConfigureStrategy<JwtAuthPayload>;
    mail: IConfigureStrategy<JwtMailPayload>;
  }
}
