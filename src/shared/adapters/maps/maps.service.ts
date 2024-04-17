import { Injectable } from '@nestjs/common';
import {
  Client,
  DistanceMatrixRequest,
  GeocodeRequest,
  TravelMode,
  UnitSystem,
} from '@googlemaps/google-maps-services-js';
import { IDistanceMatrix } from './interface/distance-matrix.interface';
import { IAddress } from '../../../modules/user/interfaces/address.interface';

@Injectable()
export class MapsService {
  constructor(private mapsClient: Client) {}

  async geocode(address: IAddress) {
    const parsedAddress = `${address.street}, ${address.number} - ${address.city} - ${address.state}, ${address.zipCode}, ${address.country}`;
    // const parsedAddress = `Rua Alba Aparecida Cardoso Luiz, 133-247 - Barra do Aririu, Palhoça - SC, 88134-530`;

    const geo = await this.mapsClient.geocode({
      params: {
        address: parsedAddress,
      },
    } as GeocodeRequest);

    return {
      address: geo.data.results[0].formatted_address,
      geometry: geo.data.results[0].geometry.location,
    };
  }

  async distanceMatrix({ origin, destination }: IDistanceMatrix) {
    const distance = await this.mapsClient.distancematrix({
      params: {
        origins: [
          {
            lat: origin.lat,
            lng: origin.lng,
          },
        ],
        destinations: [
          {
            lat: destination.lat,
            lng: destination.lng,
          },
        ],
        units: UnitSystem.metric,
        mode: TravelMode.driving,
      },
    } as DistanceMatrixRequest);

    return {
      distance: distance.data.rows[0].elements[0].distance,
      duration: distance.data.rows[0].elements[0].duration,
    };
  }

  async calculateRadius(){

  }
}
