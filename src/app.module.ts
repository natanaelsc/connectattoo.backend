import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AdapterModule } from './shared/adapters/adapter.module';
import { AppController } from './app.controller';
import { PrismaModule } from './shared/adapters/prisma/prisma.module';

@Module({
  imports: [AdapterModule, AuthModule, UserModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
