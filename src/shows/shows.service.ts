import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shows } from './entities/shows.entity';
import { CreateShowDto } from './dto/create-show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Shows)
    private showsRepository: Repository<Shows>,
  ) {}

  async createShow(createShowDto: CreateShowDto): Promise<Shows> {
    const { showName, ...rest } = createShowDto;
    const existingShow = await this.showsRepository.findOne({ where: { showName } });
    if (existingShow) {
      throw new ConflictException('해당 이름의 공연이 이미 존재합니다.');
    }
    const show = this.showsRepository.create({ showName, ...rest });
    return this.showsRepository.save(show);
  }

  async findAllShows(): Promise<Shows[]> {
    return this.showsRepository.find();
  }

  async findShowById(showId: number): Promise<Shows> {
    const show = await this.showsRepository.findOne({ where: { id: showId } });
    if (!show) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }
    return show;
  }
}
