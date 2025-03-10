import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getDateRange } from 'src/utils/date.utils';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getUserTotalPages(userId: string) {
    return await this.prisma.book.aggregate({
      _sum: {
        currentPage: true,
      },
      where: {
        userId,
      },
    });
  }

  async getUserBookPages(bookId: string) {
    return await this.prisma.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        currentPage: true,
      },
    });
  }

  async getWeeklyBookStats(userId: string, bookId?: string) {
    const now = new Date();

    const days = 7;
    const dateRange: string[] = getDateRange(now, days);

    const records = await this.prisma.record.findMany({
      where: {
        userId,
        ...(bookId ? { bookId } : {}),
        readAt: {
          gte: new Date(dateRange[0]),
          lte: now,
        },
      },
    });

    const pagesByDate: Record<string, number> = {};
    dateRange.forEach((date) => (pagesByDate[date] = 0));

    records.forEach((record) => {
      if (record.readAt) {
        const date = record.readAt.toISOString().slice(0, 10);
        pagesByDate[date] += record.pagesRead;
      }
    });

    const weeklyTotalPages = Object.values(pagesByDate).reduce(
      (sum, pages) => sum + pages,
      0
    );

    return {
      weeklyTotalPages,
      weeklyStats: pagesByDate,
    };
  }
}
