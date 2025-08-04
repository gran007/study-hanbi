import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.service.create(createTaskDto);
  }

  @Get('/board/:id')
  findAll(@Param('id') boardId: number) {
    return this.service.findAll(boardId);
  }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.service.update(+id, updateTaskDto);
  }

  @Patch('/order')
  updateOrder(@Body() dtoList: UpdateTaskOrderDto[]) {
    return this.service.updateOrder(dtoList);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
