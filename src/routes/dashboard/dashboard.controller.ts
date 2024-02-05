import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DashboardHandler } from './dashboard.handler';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';
import { HttpExceptionFilter } from '../../filters/exception.filter';
import { OrderRequest } from 'src/core/dtos/request/order.request';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dh: DashboardHandler) {}

  @Get('dailyDashboard')
  getDailyDashboard(@Query() query: OrderRequest) {
    return this.dh.getDailyDashboard(query);
  }
}
