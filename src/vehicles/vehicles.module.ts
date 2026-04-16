import { Global, Module } from '@nestjs/common';
import { TABLE_NAMES } from 'src/common/constants/tables';
import getTablesHelper from 'src/common/helpers/get-tables.helper';
import { VehiclesController } from 'src/vehicles/controllers/vehicle.controller';
import { VehicleDatabaseService } from 'src/vehicles/services/vehicle.database.service';
import { VehicleService } from 'src/vehicles/services/vehicle.service';

@Global()
@Module({
  imports: [getTablesHelper.getTables(TABLE_NAMES.VEHICLES)],
  controllers: [VehiclesController],
  providers: [VehicleDatabaseService, VehicleService],
  exports: [VehicleDatabaseService, VehicleService],
})
export class VehiclesModule {}
