import { PRICING_MODE } from 'src/bookings/constants/bookings';
import { BaseEntity } from 'src/common/entities/base-entity.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Booking extends BaseEntity {
  @Column({ type: 'timestamp' })
  pickupDateTime!: Date;

  @Column({ type: 'timestamp' })
  returnDateTime!: Date;

  @Column({ type: 'enum', enum: PRICING_MODE })
  pricingMode!: string;

  @Column()
  totalAmount!: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @Column()
  vehicleId!: number;
}
