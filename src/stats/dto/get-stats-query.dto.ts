import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

export class GetStatsQueryDto {
  @ApiPropertyOptional({
    example: 30,
    description: 'Number of days to include in the stats (max 365)',
    minimum: 1,
    maximum: 365,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  dayCount?: number;
}
