import { IAddress } from './address.interface';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthDate: string;
  termsAccepted: boolean;
  accessToken: string;
  isEmailConfirmed?: boolean;
  address?: IAddress;
}
