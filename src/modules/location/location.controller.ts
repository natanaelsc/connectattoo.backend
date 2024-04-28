import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { UserLocationDto } from './dtos/location.dto';

@Controller('/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async location(@Body() userLocationDto: UserLocationDto): Promise<void> {
    return await this.locationService.postUserLocation();
  }
}

