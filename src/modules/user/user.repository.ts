import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/shared/adapters/prisma/prisma.service';
import { IUser } from './interfaces/user.interface';
import { Prisma, User } from '@prisma/client';
import { IAddress } from './interfaces/address.interface';
import { Nullable } from '~/shared/interface/nullable.type';
import { IGetUserAndProfileByEmail } from './interfaces/get-user-profile-by-email.interface';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<Nullable<User>> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async getUserAndProfileByEmail(
    email: string,
  ): Promise<IGetUserAndProfileByEmail> {
    return await this.prismaService.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async create(data: IUser): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.prismaService.user.update({ where, data });
  }

  async createArtist(userId: string, address: IAddress): Promise<void> {
    await this.prismaService.tattooArtist.create({
      data: { user: { connect: { id: userId } }, address: { create: address } },
    });
  }
}
