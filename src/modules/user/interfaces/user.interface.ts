import { Address } from './address.interface';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  termsAccepted: boolean;
  isEmailConfirmed: boolean;
  address?: Address;
}
