import { ApiProperty } from '@nestjs/swagger';

export class StatisticDto {
  @ApiProperty({
    example: 72,
    description: 'Total number of pages read',
  })
  totalPages: number;

  @ApiProperty({
    example: { '2023-03-01': 32, '2023-03-02': 40 },
    description: 'Number of pages read per day',
  })
  pagesPerDays: Record<string, number>;
}
