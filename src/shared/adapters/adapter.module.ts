import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, MongooseModule, MailModule],
  exports: [PrismaModule, MongooseModule, MailModule],
})
export class AdapterModule {}
