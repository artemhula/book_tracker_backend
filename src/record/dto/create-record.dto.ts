import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateRecordDto {
  @IsUUID()
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  bookId: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 20 })
  pagesRead: number;
}
