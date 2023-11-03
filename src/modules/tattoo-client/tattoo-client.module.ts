import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TattooClientController } from './tattoo-client.controller';
import { TattooClientRepository } from './tattoo-client.repository';
import { TattooClientService } from './tattoo-client.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [TattooClientController],
  providers: [TattooClientRepository, TattooClientService],
  exports: [TattooClientRepository],
})
export class TattooClientModule {}
