import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@GetUserId() userId: string, @Body() bookDto: CreateBookDto) {
    return await this.bookService.add({ ...bookDto, userId });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return await this.bookService.getByIdAndUser(bookId, userId);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@GetUserId() userId: string) {
    return await this.bookService.getAll(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string,
    @Body() bookDto: UpdateBookDto
  ) {
    return await this.bookService.update(userId, bookId, bookDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return await this.bookService.delete(userId, bookId);
  }

  @Get(':id/records')
  @UseGuards(AuthGuard('jwt'))
  async getRecordsByBookId(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return await this.bookService.getByIdAndUser(bookId, userId);
  }
}
