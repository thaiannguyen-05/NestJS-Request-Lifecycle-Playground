import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from 'src/type/error.type';
@Catch()
export class ExceptionError implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const contextRequest = host.switchToHttp();
    const request = contextRequest.getRequest<Request>();
    const response = contextRequest.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof Error ? exception.message : 'Internal server error';

    const jsonErrorResponse: ApiError = {
      success: false,
      code: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      requestId: request.requestId,
    };

    response.status(status).json(jsonErrorResponse);
  }
}
