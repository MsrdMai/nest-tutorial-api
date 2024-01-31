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
  GroupRequest,
  CreateGroupReq,
} from 'src/core/dtos/request/group.request';
import { GroupResponse } from 'src/core/dtos/respone/group-response.dto';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

import { GroupHandler } from './group.handler';
import { GroupService } from './group.service';
@Controller('group')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly gp: GroupHandler,
  ) {}

  @Post()
  async post(@Body() body: CreateGroupReq) {
    return await this.gp.create(body);
  }

  @Get()
  async get(@Query() query: GroupRequest) {
    return await this.gp.getList(query);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.gp.getById(id);
  }

  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() body: CreateGroupReq) {
    try {
      const resp = await this.gp.update(id, body);
      return resp;
    } catch (e) {
      throw e;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      return await this.gp.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
