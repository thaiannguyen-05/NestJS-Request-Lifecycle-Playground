import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Payload } from 'src/type/express';

export const User = createParamDecorator(
  (data: keyof Payload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const payload = request.payload;

    if (!payload) {
      return undefined;
    }

    if (!data) {
      return payload;
    }

    return payload[data];
  },
);
