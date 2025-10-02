import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Title of the book',
    example: 'Demian',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Author of the book',
    example: 'Hermann Hesse',
  })
  author?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Total pages in the book',
    example: 192,
  })
  totalPages?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Current page of the book',
    example: 1,
  })
  currentPage?: number;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Cover image URL of the book',
    example: 'https://example.com/demian-cover.jpg',
  })
  coverUrl?: string;
}
