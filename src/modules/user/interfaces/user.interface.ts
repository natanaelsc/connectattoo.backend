import { IAddress } from './address.interface';

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthDate: string;
  termsAccepted: boolean;
  isEmailConfirmed?: boolean;
  address?: IAddress;
}
