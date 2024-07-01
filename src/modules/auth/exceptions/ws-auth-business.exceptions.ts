import { WsException } from '@nestjs/websockets';

export class WSAuthBusinessExceptions {
  static userNotFoundException() {
    return new WsException('Usuario não encontrado');
  }

  static emailNotVerifiedException() {
    return new WsException('Usuário não foi confirmado.');
  }

  static invalidTokenException() {
    return new WsException('Token inválido.');
  }
}
