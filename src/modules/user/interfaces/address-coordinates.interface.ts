import { IAddress } from './address.interface';

export interface IAddressCoordinates extends IAddress {
  latitude: number;
  longitude: number;
}
