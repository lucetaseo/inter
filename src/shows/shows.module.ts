import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { Shows } from './entities/shows.entity';
import { ShowDate } from './entities/show-date.entity';
import { Artists } from './entities/artists.entity';
import { Seats } from './entities/seats.entity';
import { Prices } from './entities/prices.entity';
import { Sections } from './entities/sections.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shows, ShowDate, Artists, Seats, Prices, Sections]),
  ],
  providers: [ShowsService],
  controllers: [ShowsController],
  exports: [ShowsService],
})
export class ShowsModule {}
