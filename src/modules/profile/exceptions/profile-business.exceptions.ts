import { ConflictException, NotFoundException } from '@nestjs/common';

export class ProfileBusinessExceptions {
  static imageProfileNotFoundException() {
    return new NotFoundException('Foto de perfil não encontrado');
  }

  static profileNotFoundException() {
    return new NotFoundException('Perfil não encontrado');
  }

  static profileAlreadyExistsException() {
    throw new ConflictException('Usuário já cadastrado.');
  }
}
