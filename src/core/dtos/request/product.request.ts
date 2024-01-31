import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  isNotEmptyObject,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsNumber,
} from 'class-validator';
import { GroupEntity } from 'src/database/entities/group.entity';
import { BaseDto } from './base.request';

export class ProductRequest extends BaseDto {}
export class CreateProductReq {
  @IsString()
  @ApiProperty()
  productName: string;

  @IsString()
  @ApiProperty()
  discrption: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  inStock: number;

  @IsString()
  @ApiProperty()
  groupId: string;
}
