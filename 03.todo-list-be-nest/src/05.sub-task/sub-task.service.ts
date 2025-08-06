import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { SubTaskEntity } from './entities/sub-task.entity';
import { Repository } from 'typeorm';
import { UpdateSubTaskOrderDto } from './dto/update-sub-task-order.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTaskEntity)
    private repository: Repository<SubTaskEntity>) { }

  async create(dto: CreateSubTaskDto) {
    return await this.repository.save(dto);
  }

  findAll(userId: number, taskId: number) {
    return this.repository.find({
      where: { userId, taskId }
    });
  }

  findOne(userId: number, id: number) {
    return this.repository.findOne({
      where: { userId, id }
    });
  }

  async update(dto: UpdateSubTaskDto) {
    const { userId, id } = dto;
    return await this.repository.update({ userId, id }, dto);
  }

  async updateOrder(dtoList: UpdateSubTaskOrderDto[]) {
    await Promise.all(dtoList.map((dto) => {
      const { userId, id } = dto;
      this.repository.update({ userId, id }, dto);
    }))
  }

  async remove(dto: DeleteDto) {
    return await this.repository.delete(dto);
  }
}
