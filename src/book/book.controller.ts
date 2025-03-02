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
  create(@GetUserId() userId: string, @Body() bookDto: CreateBookDto) {
    return this.bookService.add({ ...bookDto, userId });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return this.bookService.getByIdAndUser(bookId, userId);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@GetUserId() userId: string) {
    return this.bookService.getAll(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string,
    @Body() bookDto: UpdateBookDto
  ) {
    return this.bookService.update(userId, bookId, bookDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return this.bookService.delete(userId, bookId);
  }
}
