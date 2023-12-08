import { IAddress } from '~/modules/user/interfaces/address.interface';

export interface IRegisterArtist {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  termsAccepted: boolean;
  address: IAddress;
}
