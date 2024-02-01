import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.request';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class OrderRequest extends BaseDto {}

export class CreateOrder {
  @IsNumber()
  @ApiProperty()
  discount: number;

  @ApiProperty({ type: () => CreateOrderItemDto, isArray: true })
  @IsArray()
  items: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  amount: number;
}
