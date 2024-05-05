import { Module } from '@nestjs/common';
import { TattooController } from './tattoo.controller';
import { TattooService } from './tattoo.service';

@Module({ controllers: [TattooController], providers: [TattooService] })
export class TattooModule {}
