/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        const [res] = context.getArgs();

        const { statusCode, message, ...rest } = data || {};

        return {
          statusCode: statusCode || res.statusCode || 200,
          success: true,
          message: message || 'SUCCESS',
          ...(rest || {}),
        };
      }),
      catchError((err: Error) => {
        return throwError(() => err);
      }),
    );
  }
}
