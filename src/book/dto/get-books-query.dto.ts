import { IsString, IsOptional, IsInt, Min, IsEnum } from 'class-validator';

export class GetBooksQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  @IsEnum(['title', 'author', 'totalPages', 'currentPage'], {
    message:
      'orderBy must be one of the following: title, author, totalPages, currentPage',
  })
  orderBy?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['asc', 'desc'], {
    message: 'order must be one of the following: asc, desc',
  })
  order?: 'asc' | 'desc';
}
