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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticDto } from './dto/statistic.dto';
import { StatisticReportDto } from './dto/statistic-report.dto';

@Controller('Statistics')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOperation({ summary: 'Get total reading stats' })
  @ApiOkResponse({ type: StatisticDto })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getTotalStats(
    @GetUserId() userId: string,
    @Query(new ValidationPipe({ transform: true })) query: GetStatsQueryDto
  ) {
    return await this.statsService.getStatsByDays(userId, query.dayCount ?? 7);
  }

  @ApiOperation({ summary: 'Get comprehensive reading report stats' })
  @ApiOkResponse({ type: StatisticReportDto })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('report')
  @UseGuards(AuthGuard('jwt'))
  async getReportStats(@GetUserId() userId: string) {
    return await this.statsService.getAllStats(userId);
  }

  @ApiOperation({ summary: 'Get reading stats for a specific book' })
  @ApiOkResponse({ type: StatisticDto })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
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

  @ApiOperation({
    summary: 'Get comprehensive reading report stats for a specific book',
  })
  @ApiOkResponse({ type: StatisticReportDto })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get('report/:bookId')
  @UseGuards(AuthGuard('jwt'))
  async getBookReportStats(
    @GetUserId() userId: string,
    @Param('bookId') bookId: string
  ) {
    return await this.statsService.getAllStats(userId, bookId);
  }
}
