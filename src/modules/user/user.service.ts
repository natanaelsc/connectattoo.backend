import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/adapters/prisma/prisma.service';
import { IUser } from './interfaces/user.interface';
import { User } from '@prisma/client';
import { IAddress } from 'src/modules/user/interfaces/address.interface';
import { AuthBusinessExceptions } from '../auth/exceptions/auth-business.exceptions';
import { ITattooArtist } from './interfaces/tattoo-artist.interface';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async createUser(userData: IUser): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { email: userData.email },
    });

    if (user) throw AuthBusinessExceptions.emailAlreadyRegisteredException();

    return await this.prismaService.user.create({
      data: userData,
    });
  }

  async upgradeToArtist(userId: number, data: ITattooArtist) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) throw AuthBusinessExceptions.userNotFoundException();

    await this.prismaService.user.update({
      where: { id: userId },
      data: { tattooArtist: { create: data } },
    });
  }

  async isArtist(userId: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { tattooArtist: true },
    });

    return !!user!.tattooArtist;
  }

  async editAddress(userId: number, address: IAddress) { //revisar
    return await this.prismaService.user.update({
      where: { id: userId },
      data: {
        tattooArtist: {
          create: {
            address: { create: address },
          },
        },
      },
    });
  }

  async confirmUser(email: string): Promise<void> { //revisar
    await this.prismaService.user.update({
      where: { email },
      data: { isEmailConfirmed: true },
    });
  }
}
