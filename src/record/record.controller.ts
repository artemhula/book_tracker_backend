import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecordDto } from './dto/create-record.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUserId() userId: string, @Body() recordDto: CreateRecordDto) {
    return this.recordService.create(userId, recordDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@GetUserId() userId: string) {
    return this.recordService.getAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@GetUserId() userId: string, @Param('id') id: string) {
    return this.recordService.getById(id);
  }

  @Get('book/:bookId')
  @UseGuards(AuthGuard('jwt'))
  getByBookId(@GetUserId() userId: string, @Param('bookId') bookId: string) {
    return this.recordService.getByBookIdAndUser(bookId, userId);
  }
}
