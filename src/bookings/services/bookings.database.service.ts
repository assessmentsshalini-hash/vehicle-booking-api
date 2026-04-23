import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { RESPONSE_MESSAGES } from 'src/common/constants/responses-and-errors';
import { BaseDatabaseService } from 'src/common/services/base.database.service';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  DataSource,
  LessThan,
  MoreThan,
  Repository,
  type DeepPartial,
} from 'typeorm';

@Injectable()
export class BookingDatabaseService extends BaseDatabaseService<Booking> {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    dataSource: DataSource,
  ) {
    super(bookingRepository, dataSource);
  }

  async createBooking(data: Partial<Booking>) {
    return this.runInTransaction(async (manager) => {
      await manager.findOne(Vehicle, {
        where: { id: data.vehicleId },
        lock: { mode: 'pessimistic_write' },
      });

      const pickupTime = data.pickupDateTime as Date;
      const returnTime = data.returnDateTime as Date;

      const foundBooking = await manager.findOne(Booking, {
        where: {
          vehicleId: data.vehicleId,
          pickupDateTime: LessThan(returnTime),
          returnDateTime: MoreThan(pickupTime),
        },
      });
      if (foundBooking)
        throw new ConflictException(RESPONSE_MESSAGES.BOOKING_OVERLAP);
      const booking = manager.create(Booking, data as DeepPartial<Booking>);
      return manager.save(booking);
    });
  }
}
