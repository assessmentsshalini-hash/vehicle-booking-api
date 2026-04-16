import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  ApiPaginatedResponse,
  ApiSingleResponse,
} from 'src/common/decorators/api-response.decorator';
import { PaginationParamsQueryDTO } from 'src/common/dtos/pagination-params.query.dto';
import { IdPathDTO } from 'src/common/dtos/path.dto';
import { ResponseService } from 'src/common/services/response.service';
import {
  VehicleRequestDTO,
  VehicleResponseDTO,
} from 'src/vehicles/dtos/vehicle.dto';
import { VehicleService } from 'src/vehicles/services/vehicle.service';

@Controller({
  path: 'vehicles',
})
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehicleService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiPaginatedResponse(VehicleResponseDTO)
  @Get()
  async getAllVehicles(@Query() queryParams: PaginationParamsQueryDTO) {
    const results = await this.vehiclesService.getAllVehicles(queryParams);
    return this.responseService.getPaginatedResults(results);
  }

  @ApiOperation({ summary: 'Create a vehicle' })
  @ApiSingleResponse(VehicleResponseDTO)
  @Post()
  async createVehicle(@Body() requestBody: VehicleRequestDTO) {
    const user = await this.vehiclesService.createVehicle(requestBody);
    return {
      data: user,
    };
  }

  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiSingleResponse(VehicleResponseDTO)
  @Patch(':id')
  async updateVehicle(
    @Body() requestBody: VehicleRequestDTO,
    @Param() pathParams: IdPathDTO,
  ) {
    const user = await this.vehiclesService.updateVehicle(
      pathParams.id,
      requestBody,
    );
    return {
      data: user,
    };
  }

  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiSingleResponse(VehicleResponseDTO)
  @Delete(':id')
  async deleteVehicle(@Param() pathParams: IdPathDTO) {
    const user = await this.vehiclesService.deleteVehicle(pathParams.id);
    return {
      data: user,
    };
  }

  @ApiOperation({ summary: 'Get one vehicle' })
  @ApiSingleResponse(VehicleResponseDTO)
  @Get(':id')
  async getOneVehicle(@Param() pathParams: IdPathDTO) {
    const data = await this.vehiclesService.getVehicleById(pathParams.id);
    return { data };
  }
}
