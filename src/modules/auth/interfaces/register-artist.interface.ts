import { IAddress } from '~/modules/user/interfaces/address.interface';

export interface IRegisterArtist {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  termsAccepted: boolean;
  address: IAddress;
}
