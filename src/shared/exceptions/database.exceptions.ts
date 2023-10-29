import { UnprocessableEntityException } from '@nestjs/common';

export class P2002Exception extends UnprocessableEntityException {
  constructor(target: string) {
    super(`O ${target} informado já está em uso.`);
  }
}

export class P2031Exception extends UnprocessableEntityException {
  constructor() {
    super('Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.');
  }
}