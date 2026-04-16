/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { RESPONSE_MESSAGES } from 'src/common/constants/responses-and-errors';

import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = RESPONSE_MESSAGES.DB_FAILURE;
    const { code } = (exception.driverError as any) || {};
    switch (code) {
      case '23502': //not null violation
        status = HttpStatus.BAD_REQUEST;
        message = RESPONSE_MESSAGES.FIELD_MISSING;
        break;

      case '23503': //foreign key violation
        status = HttpStatus.BAD_REQUEST;
        message = RESPONSE_MESSAGES.RECORD_NOT_FOUND;
        break;

      case '23505': //unique constraint violation
        status = HttpStatus.BAD_REQUEST;
        message = RESPONSE_MESSAGES.DUPLICATE_DATA;
        break;

      default:
        this.logger.error(
          `Unhandled Database Error: ${code}`,
          exception.stack,
          `${request.method} ${request.url}`,
        );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }
}
