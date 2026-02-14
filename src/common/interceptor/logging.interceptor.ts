import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { finalize } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    /*
        loggin when take request and loggin when response
    */
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(finalize(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
