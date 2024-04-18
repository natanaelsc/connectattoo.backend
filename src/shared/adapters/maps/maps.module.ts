import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Client } from '@googlemaps/google-maps-services-js';

@Module({
  imports: [
    HttpModule.register({ params: { key: process.env.GOOGLE_MAPS_API_KEY } }),
  ],
  providers: [
    {
      provide: MapsService,
      useFactory(httpService: HttpService) {
        return new MapsService(
          new Client({ axiosInstance: httpService.axiosRef }),
        );
      },
      inject: [HttpService],
    },
  ],
  exports: [MapsService],
})
export class MapsModule {}
