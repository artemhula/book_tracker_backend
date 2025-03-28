import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RecordModule } from 'src/record/record.module';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [BookModule, RecordModule],
})
export class UserModule {}
