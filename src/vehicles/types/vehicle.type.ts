import { BaseEntityType } from 'src/common/types/base-entity.type';
import { VEHICLE_STATUS } from 'src/vehicles/constants/vehicle';

export type VehicleRequest = {
  title: string;
  hourlyRate: number;
  dailyRate: number;
  status: VEHICLE_STATUS;
};

export type Vehicle = BaseEntityType & VehicleRequest;
