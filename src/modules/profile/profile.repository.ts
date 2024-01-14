import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '~/shared/adapters/prisma/prisma.service';
import { Nullable } from '~/shared/interface/nullable.type';

@Injectable()
export class ProfileRepository {
  constructor(private prismaService: PrismaService) {}

  async getProfileById(id: string): Promise<Nullable<User>> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }
}
