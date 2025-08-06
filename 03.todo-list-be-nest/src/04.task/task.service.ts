import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private repository: Repository<TaskEntity>) { }

  async create(dto: CreateTaskDto) {
    return await this.repository.save(dto);
  }

  findAll(userId: number, boardId: number, priority: number) {
    return this.repository.find({
      where: { userId, boardId, priority },
      relations: ['subTasks']
    });
  }

  findOne(userId: number, id: number) {
    return this.repository.findOne({
      where: { userId, id },
      relations: ['subTasks']
    });
  }

  async update(dto: UpdateTaskDto) {
    const { userId, id } = dto;
    return await this.repository.update({ userId, id }, dto);
  }

  async updateOrder(dtoList: UpdateTaskOrderDto[]) {
    await Promise.all(dtoList.map((dto) => {
      const { userId, id } = dto;
      this.repository.update({ userId, id }, dto);
    }))
  }

  async remove(dto: DeleteDto) {
    return await this.repository.delete(dto);
  }
}
