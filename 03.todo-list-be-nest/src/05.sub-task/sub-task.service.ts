import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { SubTaskEntity } from './entities/sub-task.entity';
import { Repository } from 'typeorm';
import { UpdateSubTaskOrderDto } from './dto/update-sub-task-order.dto';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTaskEntity)
    private repository: Repository<SubTaskEntity>) { }

  async create(createSubTaskDto: CreateSubTaskDto) {

    return await this.repository.save({ ...createSubTaskDto });
  }

  findAll(taskId: number) {
    return this.repository.find({
      where: { taskId }
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateSubTaskDto: UpdateSubTaskDto) {
    return await this.repository.update({ id }, { ...updateSubTaskDto });
  }

  async updateOrder(dtoList: UpdateSubTaskOrderDto[]) {
    await Promise.all(dtoList.map((dto) => {
      const { id } = dto;
      this.repository.update({ id }, { ...dto });
    }))
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
