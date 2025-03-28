import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { BookService } from 'src/book/book.service';
import { RecordService } from 'src/record/record.service';

@Controller('me')
export class UserController {
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private recordService: RecordService
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUserId() userId: string) {
    return this.userService.findProfile(userId);
  }

  @Get('books')
  @UseGuards(AuthGuard('jwt'))
  getBooks(@GetUserId() userId: string) {
    return this.bookService.getAll(userId);
  }

  @Get('records')
  @UseGuards(AuthGuard('jwt'))
  getRecords(@GetUserId() userId: string) {
    return this.recordService.getAll(userId);
  }
}
