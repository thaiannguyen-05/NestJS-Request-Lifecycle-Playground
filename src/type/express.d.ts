import 'express';

export type Payload = {
  id: string;
  email: string;
  role: string;
};

declare module 'express' {
  interface Request {
    requestId?: string;
    startRequest?: Date;
    payload?: Payload;
  }
}
