import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tickets } from './entities/tickets.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ShowsService } from 'src/shows/shows.service';
import { Users } from 'src/user/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets)
    private ticketsRepository: Repository<Tickets>,
    private showsService: ShowsService,
  ) {}

  async createTicket(showId: number, user: Users, createTicketDto: CreateTicketDto): Promise<Tickets> {
    const show = await this.showsService.findShowById(showId);
    if (user.points < 50000) {
      throw new BadRequestException('포인트가 부족합니다.');
    }
    user.points -= 50000;
    const ticket = this.ticketsRepository.create({ ...createTicketDto, show, receiver: user });
    return this.ticketsRepository.save(ticket);
  }

  async findMyTickets(user: Users): Promise<Tickets[]> {
    return this.ticketsRepository.find({ where: { receiver: user }, relations: ['show'] });
  }

  async findTicketById(user: Users, ticketId: number): Promise<Tickets> {
    const ticket = await this.ticketsRepository.findOne({ where: { id: ticketId, receiver: user }, relations: ['show'] });
    if (!ticket) {
      throw new NotFoundException('티켓을 찾을 수 없습니다.');
    }
    return ticket;
  }
}
