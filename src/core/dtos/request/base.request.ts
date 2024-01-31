import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsDate, IsDateString } from 'class-validator';

export class BaseDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional()
  searchBy?: string;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC', ''],
  })
  sort?: 'ASC' | 'DESC' | '';

  @ApiPropertyOptional()
  sortBy?: string;

  @IsNumber()
  @ApiPropertyOptional()
  page?: number;

  @IsNumber()
  @ApiPropertyOptional()
  perPage?: number;

  @IsDateString()
  @ApiPropertyOptional()
  startDate?: string;

  @IsDateString()
  @ApiPropertyOptional()
  endDate?: string;
}
