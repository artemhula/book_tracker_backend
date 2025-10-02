import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsEnum } from 'class-validator';

export class GetBooksQueryDto {
  @ApiPropertyOptional({
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    example: 'title',
    enum: ['title', 'author', 'totalPages', 'currentPage'],
  })
  @IsOptional()
  @IsString()
  @IsEnum(['title', 'author', 'totalPages', 'currentPage'], {
    message:
      'orderBy must be one of the following: title, author, totalPages, currentPage',
  })
  orderBy?: string;

  @ApiPropertyOptional({
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  @IsEnum(['asc', 'desc'], {
    message: 'order must be one of the following: asc, desc',
  })
  order?: 'asc' | 'desc';
}
