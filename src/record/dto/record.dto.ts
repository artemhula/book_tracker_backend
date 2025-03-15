import { ApiProperty } from '@nestjs/swagger';

export class RecordResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'x1y2z3o4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  bookId: string;

  @ApiProperty({ example: 'u1y2z3o4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  userId: string;

  @ApiProperty({ example: 20 })
  pagesRead: number;

  @ApiProperty({ example: '2025-09-02T13:55:00.000Z' })
  readAt: string;
}
