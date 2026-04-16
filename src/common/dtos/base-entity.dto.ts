import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityType } from 'src/common/types/base-entity.type';

export class BaseEntityResponseDTO implements BaseEntityType {
  @ApiProperty({ type: Number, example: 1 })
  id?: number;

  @ApiProperty({ type: Date, example: '2026-04-20T08:00:00' })
  createdAt?: Date;

  @ApiProperty({ type: Date, example: '2026-04-20T08:00:00' })
  updatedAt?: Date;

  @ApiProperty({ type: Date, example: 'null', nullable: true })
  deletedAt?: Date;
}
