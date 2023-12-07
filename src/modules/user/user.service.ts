import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/adapters/prisma/prisma.service';
import { IUser } from './interfaces/user.interface';
import { User } from '@prisma/client';
import { AuthBusinessExceptions } from '../auth/exceptions/auth-business.exceptions';

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

  async confirmUser(email: string): Promise<void> {
    await this.prismaService.user.update({
      where: { email },
      data: { isEmailConfirmed: true },
    });
  }
}
