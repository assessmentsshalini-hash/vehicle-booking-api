/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { TABLE_NAMES } from 'src/common/constants/tables';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

const getTables = (...tables: TABLE_NAMES[]) => {
  if (tables.length === 0 || !tables) {
    throw new Error('At least one table is required');
  }
  const getEntity = (name: string) => {
    switch (name) {
      case TABLE_NAMES.VEHICLES:
        return Vehicle;
      case TABLE_NAMES.BOOKINGS:
        return Booking;

      default:
        throw new Error('Invalid table name');
    }
  };

  const entities = tables.map((table) => getEntity(table));
  return TypeOrmModule.forFeature(entities);
};

export default { getTables };
