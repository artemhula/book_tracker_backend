import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { GetStatsQueryDto } from './dto/get-stats-query.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getTotalStats(
    @GetUserId() userId: string,
    @Query(new ValidationPipe({ transform: true })) query: GetStatsQueryDto
  ) {
    return await this.statsService.getStatsByDays(userId, query.dayCount ?? 7);
  }

  @Get('report')
  @UseGuards(AuthGuard('jwt'))
  async getReportStats(@GetUserId() userId: string) {
    return await this.statsService.getAllStats(userId);
  }

  @Get(':bookId')
  @UseGuards(AuthGuard('jwt'))
  async getBookStats(
    @GetUserId() userId: string,
    @Param('bookId') bookId: string,
    @Query(new ValidationPipe({ transform: true })) query: GetStatsQueryDto
  ) {
    return await this.statsService.getStatsByDays(
      userId,
      query.dayCount ?? 7,
      bookId
    );
  }

  @Get('report/:bookId')
  @UseGuards(AuthGuard('jwt'))
  async getBookReportStats(
    @GetUserId() userId: string,
    @Param('bookId') bookId: string
  ) {
    return await this.statsService.getAllStats(userId, bookId);
  }
}
