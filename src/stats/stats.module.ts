import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [PrismaModule, BookModule],
})
export class StatsModule {}
