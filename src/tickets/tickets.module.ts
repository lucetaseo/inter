import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Tickets } from './entities/tickets.entity';
import { ShowsModule } from 'src/shows/shows.module';
import { Users } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tickets, Users]),
    ShowsModule,
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
