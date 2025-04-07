import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBooksQueryDto } from './dto/get-books-query.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BookResponseDto } from './dto/book.dto';
import { RecordResponseDto } from 'src/record/dto/record.dto';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiCreatedResponse({
    type: BookResponseDto,
  })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@GetUserId() userId: string, @Body() bookDto: CreateBookDto) {
    return await this.bookService.add({ ...bookDto, userId });
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiCreatedResponse({
    type: BookResponseDto,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return await this.bookService.getByIdAndUser(bookId, userId);
  }

  @ApiOperation({ summary: 'Get all books for the authenticated user' })
  @ApiOkResponse({
    type: [BookResponseDto],
  })
  @ApiUnauthorizedResponse()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @GetUserId() userId: string,
    @Query(new ValidationPipe({ transform: true })) query: GetBooksQueryDto
  ) {
    return await this.bookService.getAll(
      userId,
      query.limit,
      query.orderBy,
      query.order
    );
  }

  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiOkResponse({
    type: BookResponseDto,
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string,
    @Body() bookDto: UpdateBookDto
  ) {
    return await this.bookService.update(userId, bookId, bookDto);
  }

  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return await this.bookService.delete(userId, bookId);
  }

  @ApiOperation({ summary: 'Get reading records for a specific book' })
  @ApiOkResponse({
    type: [RecordResponseDto],
  })
  @Get(':id/records')
  @UseGuards(AuthGuard('jwt'))
  async getRecordsByBookId(
    @GetUserId() userId: string,
    @Param('id', ParseUUIDPipe) bookId: string
  ) {
    return await this.bookService.getByIdAndUser(bookId, userId);
  }
}
