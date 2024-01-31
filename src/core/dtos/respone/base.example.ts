import { ApiProperty } from '@nestjs/swagger';

export class BaseExampleSuccessResponse {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({ example: '[API200]' })
  responseCode: string;

  @ApiProperty({ example: 'สำเร็จ' })
  message: string;
}
