import { Injectable } from '@nestjs/common';

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
}

@Injectable()
export class ResponseService {
  getPaginatedResults(result: PaginatedResponse): {
    data: any;
    total: number;
  } {
    return {
      data: result.data,
      total: result.total ?? 0,
    };
  }
}
