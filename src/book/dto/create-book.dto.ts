import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'isbn must be represented as a string' })
  @Length(13, 13, {
    message: 'isbn must be equal to 13 characters',
  })
  @ApiProperty({
    description: 'International Standard Book Number',
    example: '9789388760799',
  })
  isbn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ description: 'Title of the book', example: 'Demian' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Author of the book',
    example: 'Hermann Hesse',
  })
  author: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Total pages in the book',
    example: 192,
  })
  totalPages: number;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Cover image URL of the book',
    example: 'https://example.com/demian-cover.jpg',
  })
  coverUrl: string;
}
