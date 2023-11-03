import { TattooArtistAddress } from './tattoo-artist-address.interface';

export interface TattooArtist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  isEmailConfirmed: boolean;
  address: TattooArtistAddress;
}
