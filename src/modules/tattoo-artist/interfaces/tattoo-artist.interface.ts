import { Address } from './address.interface';

export interface TattooArtist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  isEmailConfirmed: boolean;
  address: Address;
}
