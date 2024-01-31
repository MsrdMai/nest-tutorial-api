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

export class ProductRequest extends BaseDto {
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

  @ApiProperty({ type: () => GroupEntity })
  group: GroupEntity;
}
