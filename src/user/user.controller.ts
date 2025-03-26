import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { BookService } from 'src/book/book.service';

@Controller('me')
export class UserController {
  constructor(
    private userService: UserService,
    private bookService: BookService
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
}
