import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrors } from 'src/shared/utils/handle-errors.util';
import { CreateUser } from '../user/models/create-user';
import { UpdateUser } from '../user/models/update-user';
import { TattooClient } from './tattoo-client';

@Injectable()
export class TattooClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUser: CreateUser): Promise<TattooClient> {
    const tattooClient = await this.prisma.tattooClient
      .create({ data: createUser })
      .catch((error) => handleErrors(error));
    return tattooClient as TattooClient;
  }

  async update(updateUser: UpdateUser): Promise<TattooClient> {
    const { id, email, isEmailConfirmed } = updateUser;
    const tattooClient = await this.prisma.tattooClient
      .update({
        where: { id, email },
        data: { isEmailConfirmed },
      })
      .catch((error) => handleErrors(error));
    return tattooClient as TattooClient;
  }
}
