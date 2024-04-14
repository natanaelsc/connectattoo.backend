import { ISO8601 } from 'src/shared/interface/ISO8601.type';

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  birthDate: ISO8601;
  termsAccepted: boolean;
}
