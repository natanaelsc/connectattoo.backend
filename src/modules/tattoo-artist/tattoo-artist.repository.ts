import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/shared/utils/handle-errors.util';
import { CreateUser } from '../user/models/create-user';
import { TattooArtist } from './tattoo-artist';

@Injectable()
export class TattooArtistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUser: CreateUser): Promise<TattooArtist> {
    const user = await this.prisma.tattooArtist
      .create({
        data: {
          ...createUser,
          address: {
            create: createUser.address,
          },
        },
      })
      .catch((error) => handleErrors(error));
    return user as unknown as TattooArtist;
  }
}
