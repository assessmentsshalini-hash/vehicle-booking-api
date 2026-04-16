import { Global, Module } from '@nestjs/common';
import { BookingsController } from 'src/bookings/controllers/booking.controller';
import { BookingDatabaseService } from 'src/bookings/services/bookings.database.service';
import { BookingService } from 'src/bookings/services/bookings.service';
import { TABLE_NAMES } from 'src/common/constants/tables';
import getTablesHelper from 'src/common/helpers/get-tables.helper';

@Global()
@Module({
  imports: [getTablesHelper.getTables(TABLE_NAMES.BOOKINGS)],
  controllers: [BookingsController],
  providers: [BookingDatabaseService, BookingService],
  exports: [BookingDatabaseService, BookingService],
})
export class BookingsModule {}
