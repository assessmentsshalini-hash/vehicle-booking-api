import { Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSE_MESSAGES } from 'src/common/constants/responses-and-errors';
import { PaginationParamsQueryDTO } from 'src/common/dtos/pagination-params.query.dto';
import { PaginatedResponse } from 'src/common/services/response.service';
import { VehicleRequestDTO } from 'src/vehicles/dtos/vehicle.dto';
import { VehicleDatabaseService } from 'src/vehicles/services/vehicle.database.service';

@Injectable()
export class VehicleService {
  constructor(
    private readonly VehicleDatabaseService: VehicleDatabaseService,
  ) {}

  async getAllVehicles(
    queryParams: PaginationParamsQueryDTO,
  ): Promise<PaginatedResponse> {
    return this.VehicleDatabaseService.filterRecordsWithPagination(
      {},
      queryParams.start,
      queryParams.size,
      {},
    );
  }

  async createVehicle(request: VehicleRequestDTO) {
    return await this.VehicleDatabaseService.createRecord({
      ...request,
    });
  }

  async updateVehicle(id: number, request: VehicleRequestDTO) {
    const foundVehicle = await this.VehicleDatabaseService.findById(id);
    if (!foundVehicle)
      throw new NotFoundException(RESPONSE_MESSAGES.VEHICLE_NOT_FOUND);

    const updatedUser = {
      ...foundVehicle,
      ...request,
    };
    return await this.VehicleDatabaseService.updateRecord(updatedUser);
  }

  async getVehicleById(id: number) {
    const foundVehicle = await this.VehicleDatabaseService.findById(id);
    if (!foundVehicle)
      throw new NotFoundException(RESPONSE_MESSAGES.VEHICLE_NOT_FOUND);
    return foundVehicle;
  }

  async deleteVehicle(id: number) {
    const foundVehicle = await this.VehicleDatabaseService.findById(id);
    if (!foundVehicle)
      throw new NotFoundException(RESPONSE_MESSAGES.VEHICLE_NOT_FOUND);

    const data = await this.VehicleDatabaseService.softDeleteById(id);
    return data;
  }
}
