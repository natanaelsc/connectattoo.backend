import { IAddress } from './address.interface';

export interface IAddressCoordinates extends IAddress {
  lat: number;
  lng: number;
}
