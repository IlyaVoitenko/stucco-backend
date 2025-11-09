import { PipeTransform, BadRequestException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

export class ValidateImagePipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    const type = await fileTypeFromBuffer(file.buffer);
    if (!type || !type.mime.startsWith('image/')) {
      throw new BadRequestException('Invalid image file');
    }
    return file;
  }
}
