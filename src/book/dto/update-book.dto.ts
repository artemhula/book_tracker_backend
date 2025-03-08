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
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalPages?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  currentPage?: number;

  @IsUrl()
  @IsOptional()
  coverUrl?: string;
}
