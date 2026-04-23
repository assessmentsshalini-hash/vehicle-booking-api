import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  BookingRequestDTO,
  BookingResponseDTO,
} from 'src/bookings/dtos/bookings.dto';
import { BookingService } from 'src/bookings/services/bookings.service';
import {
  ApiPaginatedResponse,
  ApiSingleResponse,
} from 'src/common/decorators/api-response.decorator';
import { PaginationParamsQueryDTO } from 'src/common/dtos/pagination-params.query.dto';
import { IdPathDTO } from 'src/common/dtos/path.dto';
import { ResponseService } from 'src/common/services/response.service';

@Controller({
  path: 'bookings',
})
export class BookingsController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: 'Get all bookings' })
  @ApiPaginatedResponse(BookingResponseDTO)
  @Get()
  async getAllBookings(@Query() queryParams: PaginationParamsQueryDTO) {
    const results = await this.bookingService.getAllBookings(queryParams);
    return this.responseService.getPaginatedResults(results);
  }

  @ApiOperation({ summary: 'Create a booking' })
  @ApiSingleResponse(BookingResponseDTO)
  @HttpCode(201)
  @Post()
  async createBooking(@Body() requestBody: BookingRequestDTO) {
    const user = await this.bookingService.createBooking(requestBody);
    return {
      data: user,
    };
  }

  @ApiOperation({ summary: 'Get one booking' })
  @ApiSingleResponse(BookingResponseDTO)
  @Get(':id')
  async getOneBooking(@Param() pathParams: IdPathDTO) {
    const data = await this.bookingService.getBookingById(pathParams.id);
    return { data };
  }
}
