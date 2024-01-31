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
import {
  ProductRequest,
  CreateProductReq,
} from 'src/core/dtos/request/product.request';
import { ProductResponse } from 'src/core/dtos/respone/product-response.dto';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

import { ProductHandler } from './product.handler';
import { ProductService } from './product.service';

@Controller('product')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly ph: ProductHandler,
  ) {}

  @Post()
  async post(@Body() body: CreateProductReq) {
    return await this.ph.create(body);
  }

  @Get()
  async get(@Query() query: ProductRequest) {
    return await this.ph.getList(query);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.ph.getById(id);
  }

  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() body: CreateProductReq) {
    try {
      const resp = await this.ph.update(id, body);
      return resp;
    } catch (e) {
      throw e;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      return await this.ph.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
