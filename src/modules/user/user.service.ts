import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private confirmationKey: string;
  private email: string;
  constructor(private readonly prisma: PrismaService) {}

  public async getConfirmationKey() {
    return this.confirmationKey;
  }
  public async getEmail() {
    return this.email;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
