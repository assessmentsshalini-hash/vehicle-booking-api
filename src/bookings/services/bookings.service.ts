import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PRICING_MODE } from 'src/bookings/constants/bookings';
import { BookingRequestDTO } from 'src/bookings/dtos/bookings.dto';
import { BookingDatabaseService } from 'src/bookings/services/bookings.database.service';
import { RESPONSE_MESSAGES } from 'src/common/constants/responses-and-errors';
import { PaginationParamsQueryDTO } from 'src/common/dtos/pagination-params.query.dto';
import { PaginatedResponse } from 'src/common/services/response.service';
import { VEHICLE_STATUS } from 'src/vehicles/constants/vehicle';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehicleService } from 'src/vehicles/services/vehicle.service';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingDatabaseService: BookingDatabaseService,
    private readonly vehicleService: VehicleService,
  ) {}

  async getAllBookings(
    queryParams: PaginationParamsQueryDTO,
  ): Promise<PaginatedResponse> {
    return this.bookingDatabaseService.filterRecordsWithPagination(
      {},
      queryParams.start,
      queryParams.size,
      {},
    );
  }

  async createBooking(request: BookingRequestDTO) {
    //check if vehicle exists
    const foundVehicle = await this.vehicleService.getVehicleById(
      request.vehicleId,
    );
    if (!foundVehicle)
      throw new NotFoundException(RESPONSE_MESSAGES.VEHICLE_NOT_FOUND);

    //check if active
    if (foundVehicle.status !== VEHICLE_STATUS.ACTIVE)
      throw new BadRequestException(RESPONSE_MESSAGES.VEHICLE_INACTIVE);

    //check pickup and return times

    const pickupTime = new Date(request.pickupDateTime);
    const returnTime = new Date(request.returnDateTime);

    if (returnTime <= pickupTime) {
      throw new BadRequestException(RESPONSE_MESSAGES.INVALID_BOOKING_RANGE);
    }

    //check overlaps

    const overlappingBooking = await this.bookingDatabaseService.findOneRecord({
      vehicleId: request.vehicleId,
      pickupDateTime: LessThan(returnTime),
      returnDateTime: MoreThan(pickupTime),
    });

    if (overlappingBooking) {
      throw new ConflictException(RESPONSE_MESSAGES.BOOKING_OVERLAP);
    }

    //calculate the total price
    const totalPrice = this.calculatePrice(
      foundVehicle,
      pickupTime,
      returnTime,
      request.pricingMode,
    );

    return await this.bookingDatabaseService.createRecord({
      ...request,
      totalAmount: totalPrice,
    });
  }

  private calculatePrice(
    vehicle: Vehicle,
    pickupTime: Date,
    returnTime: Date,
    mode: PRICING_MODE,
  ): number {
    const diff = returnTime.getTime() - pickupTime.getTime();

    const hours = Math.ceil(diff / (1000 * 60 * 60));
    const days = Math.ceil(hours / 24);

    if (mode === PRICING_MODE.DAILY) {
      return days * vehicle.dailyRate;
    }

    const hourlyTotal = hours * vehicle.hourlyRate;
    const dailyTotal = days * vehicle.dailyRate;

    return Math.min(hourlyTotal, dailyTotal);
  }

  async getBookingById(id: number) {
    const foundBooking = await this.bookingDatabaseService.findById(id);
    if (!foundBooking)
      throw new NotFoundException(RESPONSE_MESSAGES.BOOKING_NOT_FOUND);
    return foundBooking;
  }
}
