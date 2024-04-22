import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const UpdateImageDTO = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: `^(image/jpeg|image/png)$` })
  .addMaxSizeValidator({
    maxSize: 1048576, // 1MB
    message: 'File size is too large',
  })
  .build({
    fileIsRequired: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
