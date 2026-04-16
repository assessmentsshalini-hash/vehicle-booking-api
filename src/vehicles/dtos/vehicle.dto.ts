/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntityResponseDTO } from 'src/common/dtos/base-entity.dto';
import { VEHICLE_STATUS } from 'src/vehicles/constants/vehicle';
import { Vehicle, VehicleRequest } from 'src/vehicles/types/vehicle.type';

export class VehicleRequestDTO implements VehicleRequest {
  @ApiProperty({ example: 'Toyota Corolla' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  hourlyRate!: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  dailyRate!: number;

  @ApiProperty({ example: 'active' })
  @IsNotEmpty()
  @IsEnum(VEHICLE_STATUS)
  status!: VEHICLE_STATUS;
}

export class VehicleResponseDTO
  extends BaseEntityResponseDTO
  implements Vehicle
{
  @ApiProperty({ example: 'Toyota Corolla' })
  title!: string;

  @ApiProperty({ example: 10 })
  hourlyRate!: number;

  @ApiProperty({ example: 20 })
  dailyRate!: number;

  @ApiProperty({ example: 'active' })
  status!: VEHICLE_STATUS;
}
