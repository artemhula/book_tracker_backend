import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getTotalStats(
    @GetUserId() userId: string,
    @Query('dayCount') dayCount: number = 7
  ) {
    return await this.statsService.getStats(userId, dayCount);
  }

  @Get(':bookId')
  @UseGuards(AuthGuard('jwt'))
  async getBookStats(
    @GetUserId() userId: string,
    @Param('bookId') bookId: string,
    @Query('dayCount') dayCount: number = 7
  ) {
    return await this.statsService.getStats(userId, dayCount, bookId);
  }
}
