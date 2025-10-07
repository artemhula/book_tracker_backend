import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async add(data: {
    userId: string;
    isbn: string;
    title: string;
    author?: string;
    totalPages?: number;
    currentPage?: number;
    coverUrl?: string;
  }) {
    return this.prisma.book.create({
      data: {
        userId: data.userId,
        isbn: data.isbn,
        title: data.title,
        author: data.author,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        coverUrl: data.coverUrl,
      },
    });
  }

  async getByIdAndUser(id: string, userId: string) {
    const book = await this.prisma.book.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async getAll(
    userId: string,
    limit?: number,
    orderBy?: string,
    order: 'asc' | 'desc' = 'asc'
  ) {
    return await this.prisma.book.findMany({
      where: { userId },
      ...(orderBy && {
        orderBy: { [orderBy]: order },
      }),
      ...(limit && { take: Number(limit) }),
    });
  }

  async update(userId: string, id: string, dto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id, userId },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(userId: string, id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id, userId },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    await this.prisma.book.delete({
      where: { id },
    });

    return true;
  }
}
