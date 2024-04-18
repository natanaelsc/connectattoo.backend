import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { MailModule } from './mail/mail.module';
import { MapsModule } from './maps/maps.module';

@Module({
  imports: [PrismaModule, MongooseModule, MailModule, MapsModule],
  exports: [PrismaModule, MongooseModule, MailModule, MapsModule],
})
export class AdapterModule {}
