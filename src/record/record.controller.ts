import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { GetUserId } from 'src/decorators/get-user-id.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecordDto } from './dto/create-record.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RecordResponseDto } from './dto/record.dto';

@ApiTags('Reading Records')
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({ summary: 'Create a new reading record' })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@GetUserId() userId: string, @Body() recordDto: CreateRecordDto) {
    return this.recordService.create(userId, recordDto);
  }

  @ApiOperation({
    summary: 'Get all reading records for the authenticated user',
  })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@GetUserId() userId: string) {
    return this.recordService.getAll(userId);
  }

  @ApiOperation({ summary: 'Get a reading record by ID' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@GetUserId() userId: string, @Param('id') id: string) {
    return this.recordService.getById(id);
  }

  @ApiOperation({ summary: 'Get reading records for a specific book' })
  @ApiOkResponse({
    type: [RecordResponseDto],
  })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @Get('book/:bookId')
  @UseGuards(AuthGuard('jwt'))
  getByBookId(@GetUserId() userId: string, @Param('bookId') bookId: string) {
    return this.recordService.getByBookIdAndUser(bookId, userId);
  }
}
