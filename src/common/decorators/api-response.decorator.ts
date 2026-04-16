import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiPaginatedResponse<T>(itemType: Type<T>) {
  return applyDecorators(
    ApiExtraModels(itemType),
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: { type: 'number', example: 200 },
          message: { type: 'string', example: 'SUCCESS' },
          success: { type: 'boolean', example: true },
          total: { type: 'number', example: 20 },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(itemType) },
          },
        },
      },
    }),
  );
}

export function ApiSingleResponse<T>(itemType: Type<T>) {
  return applyDecorators(
    ApiExtraModels(itemType),
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: { type: 'number', example: 200 },
          message: { type: 'string', example: 'SUCCESS' },
          success: { type: 'boolean', example: true },
          data: { $ref: getSchemaPath(itemType) },
        },
      },
    }),
  );
}
