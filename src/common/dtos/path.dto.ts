/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdPathDTO {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  id!: number;
}
