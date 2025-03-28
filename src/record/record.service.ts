import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { BookService } from 'src/book/book.service';

@Injectable()
export class RecordService {
  constructor(
    private prisma: PrismaService,
    private bookService: BookService
  ) {}

  async create(userId: string, dto: CreateRecordDto) {
    const { bookId } = dto;
    const book = await this.bookService.getByIdAndUser(bookId, userId);
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} is not found`);
    }

    const record = await this.prisma.record.create({
      data: {
        userId,
        ...dto,
      },
    });

    return record;
  }

  async getAll(userId: string) {
    return this.prisma.record.findMany({
      where: { userId },
      orderBy: { readAt: 'desc' },
    });
  }

  async getById(id: string) {
    return this.prisma.record.findUnique({
      where: { id },
    });
  }

  async getByBookIdAndUser(bookId: string, userId: string) {
    return this.prisma.record.findMany({
      where: { bookId, userId },
      orderBy: { readAt: 'desc' },
    });
  }
}
