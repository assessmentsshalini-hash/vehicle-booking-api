import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDTO<T> {
  @ApiProperty({ example: 200 })
  statusCode!: number;

  @ApiProperty({ example: 'SUCCESS' })
  message!: string;

  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 20 })
  total!: number;

  @ApiProperty({ name: 'data', isArray: true })
  data!: T[];
}
