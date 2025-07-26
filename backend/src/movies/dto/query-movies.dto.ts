import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryMoviesDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 8,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 8;

  @ApiPropertyOptional({
    description: 'Search term for movie title',
    example: 'Shawshank',
  })
  @IsString()
  @IsOptional()
  search?: string;
} 