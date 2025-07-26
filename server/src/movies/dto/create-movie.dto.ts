import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsNumber, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'The Shawshank Redemption',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Movie description',
    example: 'Two imprisoned men bond over a number of years...',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Movie release date',
    example: '1994-09-23T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  releaseDate?: string;

  @ApiProperty({
    description: 'Movie rating (0-10)',
    example: 9.3,
    minimum: 0,
    maximum: 10,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @Type(() => Number)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Movie poster image or video file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: any;
} 