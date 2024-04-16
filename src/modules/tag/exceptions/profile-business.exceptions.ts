import { ConflictException, NotFoundException } from '@nestjs/common';

export class TagBusinessExceptions {
  static tagNotFoundException() {
    throw new NotFoundException('Tag não encontrado');
  }

  static tagsNotFoundException() {
    throw new NotFoundException('Tags não foram encontrados');
  }

  static tagAlreadyExistsException() {
    throw new ConflictException('Tag já cadastrado.');
  }
}
