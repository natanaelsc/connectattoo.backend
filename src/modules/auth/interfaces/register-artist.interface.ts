import { IAddress } from '~/modules/user/interfaces/address.interface';
import { ISO8601 } from 'src/shared/interface/ISO8601.type';

export interface IRegisterArtist {
  name: string;
  email: string;
  password: string;
  birthDate: ISO8601;
  termsAccepted: boolean;
  address: IAddress;
}
