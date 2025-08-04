import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private repository: Repository<TaskEntity>) { }

  async create(createTaskDto: CreateTaskDto) {

    return await this.repository.save({ ...createTaskDto });
  }

  findAll(boardId: number) {
    return this.repository.find({
      where: { boardId },
      relations: ['subTasks']
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['subTasks']
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.repository.update({ id }, { ...updateTaskDto });
  }

  async updateOrder(dtoList: UpdateTaskOrderDto[]) {
    await Promise.all(dtoList.map((dto) => {
      const { id } = dto;
      this.repository.update({ id }, { ...dto });
    }))
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
