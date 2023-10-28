import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

/*
 * 422 - Unprocessable Entity
 */
export class EmailNotFoundException extends UnprocessableEntityException {
  constructor() {
    super('O e-mail informado não foi cadastrado.');
  }
}

/*
 * 500 - Internal Server Error
 */
export class UnknownErrorException extends InternalServerErrorException {
  constructor() {
    super('Erro não conhecido ao tentar executar ação.');
  }
}
