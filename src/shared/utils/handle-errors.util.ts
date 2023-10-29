import { Prisma } from '@prisma/client';
import { P2002Exception, P2031Exception } from '../exceptions/database.exceptions';
import { UnknownErrorException } from '../exceptions/general.exceptions';
import { isProduction } from './constants.util';

export function prismaKnownRequestErrors(
  error: Prisma.PrismaClientKnownRequestError,
) {
  const target = (error.meta?.target as Array<string>) || ['unknow_meta'];
  if (error.code === 'P2002') throw new P2002Exception(target[0]);
  if (error.code === 'P2031') throw new P2031Exception();
}

export function unknownError(error: unknown) {
  if (isProduction() !== true) console.error('unknownError', error);
  throw new UnknownErrorException();
}

export function handleErrors(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    prismaKnownRequestErrors(error);
  }
  unknownError(error);
}
