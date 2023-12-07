import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/shared/adapters/prisma/prisma.service';
import { IUser } from './interfaces/user.interface';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
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
}
