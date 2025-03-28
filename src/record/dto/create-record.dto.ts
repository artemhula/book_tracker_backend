import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateRecordDto {
  @IsUUID()
  bookId: string;

  @IsInt()
  @Min(0)
  pagesRead: number;
}
