import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateBoardOrderDto } from './dto/update-board-order-.dto';
import { BoardEntity } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private repository: Repository<BoardEntity>) { }

  async create(dto: CreateBoardDto) {

    return await this.repository.save({ ...dto });
  }

  findAll(projectId: number) {
    return this.repository.find({
      where: { projectId },
      relations: ['tasks']
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['tasks']
    });
  }

  async update(id: number, dto: UpdateBoardDto) {
    return await this.repository.update({ id }, { ...dto });
  }

  async updateOrder(dtoList: UpdateBoardOrderDto[]) {
    await Promise.all(dtoList.map((dto) => {
      const { id } = dto;
      this.repository.update({ id }, { ...dto });
    }))
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
