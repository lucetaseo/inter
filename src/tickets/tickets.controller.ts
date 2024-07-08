import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/user-info.decorator';
import { Users } from 'src/user/entities/user.entity';

@Controller('tickets')
@UseGuards(AuthGuard('jwt'))
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post('/:showId')
  @UsePipes(ValidationPipe)
  async createTicket(@Param('showId') showId: number, @UserInfo() user: Users, @Body() createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketsService.createTicket(showId, user, createTicketDto);
    return {
      status: 201,
      message: '티켓 예매가 완료되었습니다.',
      data: ticket,
    };
  }

  @Get('/')
  async findMyTickets(@UserInfo() user: Users) {
    const tickets = await this.ticketsService.findMyTickets(user);
    return {
      status: 200,
      message: '티켓 목록 조회에 성공했습니다.',
      data: tickets,
    };
  }

  @Get('/:ticketId')
  async findTicketById(@UserInfo() user: Users, @Param('ticketId') ticketId: number) {
    const ticket = await this.ticketsService.findTicketById(user, ticketId);
    return {
      status: 200,
      message: '티켓 상세 조회에 성공했습니다.',
      data: ticket,
    };
  }
}
