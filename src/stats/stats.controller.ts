import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getTotalStats(@GetUserId() userId: string) {
    return await this.statsService.getWeeklyBookStats(userId);
  }

  @Get(':bookId')
  @UseGuards(AuthGuard('jwt'))
  async getBookStats(
    @GetUserId() userId: string,
    @Param('bookId') bookId: string
  ) {
    return await this.statsService.getWeeklyBookStats(userId, bookId);
  }
}
