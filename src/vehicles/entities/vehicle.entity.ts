import { Booking } from 'src/bookings/entities/booking.entity';
import { BaseEntity } from 'src/common/entities/base-entity.entity';
import { VEHICLE_STATUS } from 'src/vehicles/constants/vehicle';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Vehicle extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  hourlyRate!: number;

  @Column()
  dailyRate!: number;

  @Column({ type: 'enum', enum: VEHICLE_STATUS })
  status!: VEHICLE_STATUS;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings!: Booking[];
}
