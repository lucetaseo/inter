import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/user-role.type';

@Controller('shows')
export class ShowsController {
  constructor(private showsService: ShowsService) {}

  @Post('/')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UsePipes(ValidationPipe)
  async createShow(@Body() createShowDto: CreateShowDto) {
    const show = await this.showsService.createShow(createShowDto);
    return {
      status: 201,
      message: '공연 등록이 완료되었습니다.',
      data: show,
    };
  }

  @Get('/')
  async findAllShows() {
    const shows = await this.showsService.findAllShows();
    return {
      status: 200,
      message: '공연 목록 조회에 성공했습니다.',
      data: shows,
    };
  }

  @Get('/:showId')
  async findShowById(@Param('showId') showId: number) {
    const show = await this.showsService.findShowById(showId);
    return {
      status: 200,
      message: '공연 상세 조회에 성공했습니다.',
      data: show,
    };
  }
}
