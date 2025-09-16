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
  isbn: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalPages: number;

  @IsUrl()
  @IsOptional()
  coverUrl: string;
}
