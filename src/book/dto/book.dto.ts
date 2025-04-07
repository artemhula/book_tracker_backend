import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  userId: string;

  @ApiProperty({ example: '9789388760799' })
  isbn: string;

  @ApiProperty({ example: 'Demian' })
  title: string;

  @ApiPropertyOptional({ example: 'Hermann Hesse', required: false })
  author?: string;

  @ApiProperty({ example: 192, required: false })
  totalPages?: number;

  @ApiProperty({ example: 1, required: false })
  currentPage?: number;

  @ApiProperty({
    example: 'https://example.com/demian-cover.jpg',
    required: false,
  })
  coverUrl?: string;
}
