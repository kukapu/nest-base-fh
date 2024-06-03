import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {

  @ApiProperty({
    default: 10,
    description: 'Limit of items per page',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Offset of items to skip',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  // Transformar
  offset?: number;
}
