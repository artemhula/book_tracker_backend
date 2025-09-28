import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getDateRange } from 'src/utils/date.utils';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

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

  private groupRecordsByDate(
    records: any[],
    dateRange: string[]
  ): Record<string, number> {
    const pagesByDate: Record<string, number> = {};
    dateRange.forEach((date) => (pagesByDate[date] = 0));

    records.forEach((record) => {
      if (record.readAt) {
        const date = record.readAt.toISOString().slice(0, 10);
        pagesByDate[date] += record.pagesRead;
      }
    });

    return pagesByDate;
  }

  private calculateTotalPages(pagesByDate: Record<string, number>): number {
    return Object.values(pagesByDate).reduce((sum, pages) => sum + pages, 0);
  }

  async getStatsByDays(userId: string, dayCount: number, bookId?: string) {
    const now = new Date();
    const dateRange: string[] = getDateRange(now, dayCount);

    const records = await this.getRecordsByDateRange(
      userId,
      dateRange[0],
      now,
      bookId
    );

    const pagesPerDays: Record<string, number> = this.groupRecordsByDate(
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
    const pagesByWeek = this.groupRecordsByDate(weeklyRecords, weeklyDateRange);
    const pagesByMonth = this.groupRecordsByDate(
      monthlyRecords,
      monthlyDateRange
    );
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
