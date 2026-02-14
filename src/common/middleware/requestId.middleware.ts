import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    /*
        for case x-request-id is generate from before system like api gateway
    */
    const requestId = req.headers['x-request-id']?.toString() ?? randomUUID();
    req.requestId = requestId;

    /*
        attach start request time for logging purpose and the duration calculation in interceptor
    */
    const startRequest = new Date();
    req.startRequest = startRequest;

    // set response header for client
    res.setHeader('x-request-id', requestId);
    next();
  }
}
