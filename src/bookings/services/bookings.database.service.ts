import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { BaseDatabaseService } from 'src/common/services/base.database.service';
import { Repository } from 'typeorm';

@Injectable()
export class BookingDatabaseService extends BaseDatabaseService<Booking> {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {
    super(bookingRepository);
  }
}
