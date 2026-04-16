import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDTO<T> {
  @ApiProperty({ example: 200 })
  statusCode!: number;

  @ApiProperty({ example: 'SUCCESS' })
  message!: string;

  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty()
  data!: T;
}
