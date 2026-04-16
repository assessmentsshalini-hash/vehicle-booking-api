/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PRICING_MODE } from 'src/bookings/constants/bookings';
import { Booking, BookingRequest } from 'src/bookings/types/bookings.type';
import { BaseEntityResponseDTO } from 'src/common/dtos/base-entity.dto';

export class BookingRequestDTO implements BookingRequest {
  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  vehicleId!: number;

  @ApiProperty({ example: '2026-04-20T16:00:00' })
  @IsNotEmpty()
  @IsDateString()
  pickupDateTime!: Date;

  @ApiProperty({ example: '2026-04-20T18:00:00' })
  @IsNotEmpty()
  @IsDateString()
  returnDateTime!: Date;

  @ApiProperty({ example: 'hourly' })
  @IsNotEmpty()
  @IsEnum(PRICING_MODE)
  pricingMode!: PRICING_MODE;
}

export class BookingResponseDTO
  extends BaseEntityResponseDTO
  implements Booking
{
  @ApiProperty({ example: 10 })
  vehicleId!: number;

  @ApiProperty({ example: '2026-04-20T16:00:00' })
  pickupDateTime!: Date;

  @ApiProperty({ example: '2026-04-20T18:00:00' })
  returnDateTime!: Date;

  @ApiProperty({ example: 'hourly' })
  pricingMode!: PRICING_MODE;

  @ApiProperty({ example: 10000 })
  totalAmount!: number;
}
