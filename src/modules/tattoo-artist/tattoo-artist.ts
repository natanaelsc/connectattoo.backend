import { Address } from 'src/modules/user/interfaces/address.interface';
import { User } from 'src/modules/user/interfaces/user.interface';

export interface TattooArtist extends User {
  address: TattooArtistAddress;
}

export interface TattooArtistAddress extends Address {
  tattooArtistId: string;
}
