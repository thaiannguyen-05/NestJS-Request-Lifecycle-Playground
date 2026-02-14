import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ResponseMapping } from 'src/type/mapping.type';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ResponseMapping<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseMapping<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: T): ResponseMapping<T> => {
        return {
          success: true,
          code: response?.statusCode ?? HttpStatus.OK,
          data,
          message: 'Request successful',
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
