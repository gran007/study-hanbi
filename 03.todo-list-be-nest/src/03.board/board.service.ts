import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateBoardOrderDto } from './dto/update-board-order-.dto';
import { BoardEntity } from './entities/board.entity';
import { Repository } from 'typeorm';
import { DeleteDto } from 'src/10.common/dto/delete.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private repository: Repository<BoardEntity>) { }

  async create(dto: CreateBoardDto) {
    return await this.repository.save(dto);
  }

  async findAll(userId: number, projectId: number) {
    return await this.repository.find({
      where: { userId, projectId },
      relations: ['tasks']
    });
  }

  async findOne(userId: number, id: number) {
    return await this.repository.findOne({
      where: { userId, id },
      relations: ['tasks']
    });
  }

  async update(dto: UpdateBoardDto) {
    const { userId, id } = dto;
    return await this.repository.update({ userId, id }, dto);
  }

  async updateOrder(dtoList: UpdateBoardOrderDto[]) {
    await Promise.all(dtoList.map((dto) => {
      const { userId, id } = dto;
      this.repository.update({ userId, id }, dto);
    }))
  }

  async remove(dto: DeleteDto) {
    return await this.repository.delete(dto);
  }
}
