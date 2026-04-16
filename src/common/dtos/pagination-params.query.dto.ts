/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { PaginationParamsQuery } from 'src/common/types/pagination-params-query.type';

export class PaginationParamsQueryDTO implements PaginationParamsQuery {
  @ApiProperty({
    name: 'start',
    description: 'Starting element index',
    required: false,
    example: 0,
    type: () => Number,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  start?: number;

  @ApiProperty({
    name: 'size',
    description: 'Number of element to fetch',
    required: false,
    example: 10,
    type: () => Number,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  size?: number;
}
