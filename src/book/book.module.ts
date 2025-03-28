import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { RecordModule } from 'src/record/record.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
  imports: [RecordModule],
})
export class BookModule {}
