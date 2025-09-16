import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './book/book.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [ConfigModule.forRoot(), AuthModule, BookModule],
})
export class AppModule {}
