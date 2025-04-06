import { Injectable } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getDateRange } from 'src/utils/date.utils';
import groupRecordsByDate from 'src/utils/stats.utils';

@Injectable()
export class StatsService {
  constructor(
    private prisma: PrismaService,
    private bookService: BookService
  ) {}

  private async getRecordsByDateRange(
    userId: string,
    startDate: string,
    endDate: Date,
    bookId?: string
  ) {
    return await this.prisma.record.findMany({
      where: {
        userId,
        bookId,
        readAt: {
          gte: new Date(startDate),
          lte: endDate,
        },
      },
    });
  }

  private calculateTotalPages(pagesByDate: Record<string, number>): number {
    return Object.values(pagesByDate).reduce((sum, pages) => sum + pages, 0);
  }

  async getStatsByDays(userId: string, dayCount: number, bookId?: string) {
    if (bookId) {
      await this.bookService.getByIdAndUser(bookId, userId);
    }
    const now = new Date();
    const dateRange: string[] = getDateRange(now, dayCount);

    const records = await this.getRecordsByDateRange(
      userId,
      dateRange[0],
      now,
      bookId
    );

    const pagesPerDays: Record<string, number> = groupRecordsByDate(
      records,
      dateRange
    );
    const totalPages = this.calculateTotalPages(pagesPerDays);

    return {
      totalPages,
      pagesByDays: pagesPerDays,
    };
  }

  async getAllStats(userId: string, bookId?: string) {
    if (bookId) {
      await this.bookService.getByIdAndUser(bookId, userId);
    }
    const now = new Date();
    const weeklyDateRange: string[] = getDateRange(now, 7);
    const monthlyDateRange: string[] = getDateRange(now, 30);
    const weeklyRecords = await this.getRecordsByDateRange(
      userId,
      weeklyDateRange[0],
      now,
      bookId
    );
    const monthlyRecords = await this.getRecordsByDateRange(
      userId,
      monthlyDateRange[0],
      now,
      bookId
    );
    const pagesByWeek = groupRecordsByDate(weeklyRecords, weeklyDateRange);
    const pagesByMonth = groupRecordsByDate(monthlyRecords, monthlyDateRange);
    const totalWeeklyPages = this.calculateTotalPages(pagesByWeek);
    const totalMonthlyPages = this.calculateTotalPages(pagesByMonth);

    return {
      weekly: {
        totalPages: totalWeeklyPages,
        pagesPerDays: pagesByWeek,
      },
      monthly: {
        totalPages: totalMonthlyPages,
        pagesPerDays: pagesByMonth,
      },
    };
  }
}
