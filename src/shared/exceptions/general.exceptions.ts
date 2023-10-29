import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class EmailNotFoundException extends UnprocessableEntityException {
  constructor() {
    super('O e-mail informado não foi cadastrado.');
  }
}

export class UnknownErrorException extends InternalServerErrorException {
  constructor() {
    super('Erro não conhecido ao tentar executar ação.');
  }
}
