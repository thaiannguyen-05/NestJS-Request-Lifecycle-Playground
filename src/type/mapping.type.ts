export type ResponseMapping<T> = {
  success: boolean;
  code: number;
  data: T;
  message: string;
  timestamp: string;
};
