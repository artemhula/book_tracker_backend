import { IsInt, Min, Max, IsOptional } from 'class-validator';

export class GetStatsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  dayCount?: number;
}
