export type ApiError = {
  success: false;
  code: number;
  message: string;
  timestamp: string;
  path: string;
  method: string;
  requestId?: string;
};
