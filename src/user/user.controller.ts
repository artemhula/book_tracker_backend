import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { BookService } from 'src/book/book.service';
import { RecordService } from 'src/record/record.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.dto';
import { RecordResponseDto } from 'src/record/dto/record.dto';

@ApiTags('User')
@Controller('me')
export class UserController {
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private recordService: RecordService
  ) {}

  @ApiOperation({ summary: 'Get the profile of the authenticated user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUserId() userId: string) {
    return this.userService.findProfile(userId);
  }

  @ApiOperation({ summary: 'Get all books of the authenticated user' })
  @ApiOkResponse({ type: [UserResponseDto] })
  @ApiUnauthorizedResponse()
  @Get('books')
  @UseGuards(AuthGuard('jwt'))
  getBooks(@GetUserId() userId: string) {
    return this.bookService.getAll(userId);
  }

  @ApiOperation({
    summary: 'Get all reading records of the authenticated user',
  })
  @ApiOkResponse({ type: [RecordResponseDto] })
  @ApiUnauthorizedResponse()
  @Get('records')
  @UseGuards(AuthGuard('jwt'))
  getRecords(@GetUserId() userId: string) {
    return this.recordService.getAll(userId);
  }
}
