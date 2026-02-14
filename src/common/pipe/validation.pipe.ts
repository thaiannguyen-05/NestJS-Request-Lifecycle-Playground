import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform<T>(value: T) {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }
}
