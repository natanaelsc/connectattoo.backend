import { NotFoundException } from '@nestjs/common';

export class ProfileBusinessExceptions {
  static profileNotFoundException() {
    return new NotFoundException('Perfil não encontrado');
  }
}
