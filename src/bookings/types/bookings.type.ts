import { PRICING_MODE } from 'src/bookings/constants/bookings';
import { BaseEntityType } from 'src/common/types/base-entity.type';

export type BookingRequest = {
  vehicleId: number;
  pickupDateTime: Date;
  returnDateTime: Date;
  pricingMode: PRICING_MODE;
};

export type Booking = BaseEntityType &
  BookingRequest & {
    totalAmount: number;
  };
