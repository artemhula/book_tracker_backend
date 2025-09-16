import { forwardRef, Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [forwardRef(() => BookModule)],
  exports: [RecordService],
})
export class RecordModule {}
