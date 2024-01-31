import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.request';
import { IsString } from 'class-validator';

export class GroupRequest extends BaseDto {}

export class CreateGroupReq {
  @IsString()
  @ApiProperty()
  groupName: string;

  @IsString()
  @ApiProperty()
  remark: string;
}
