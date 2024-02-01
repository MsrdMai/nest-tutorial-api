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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderRequest, CreateOrder } from 'src/core/dtos/request/order.request';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

import { OrderHandler } from './order.handler';
import { OrderService } from './order.service';

@Controller('order')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly rd: OrderHandler,
  ) {}

  @Post()
  async post(@Body() body: CreateOrder) {
    return await this.rd.create(body);
  }

  @Get()
  async get(@Query() query: OrderRequest) {
    return await this.rd.getList(query);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.rd.getById(id);
  }

  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() body: CreateOrder) {
    try {
      const resp = await this.rd.update(id, body);
      return resp;
    } catch (e) {
      throw e;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      return await this.rd.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
