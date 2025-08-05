import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { UpdateSubTaskOrderDto } from './dto/update-sub-task-order.dto';

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly service: SubTaskService) { }

  @Post()
  create(@Body() createSubTaskDto: CreateSubTaskDto) {
    return this.service.create(createSubTaskDto);
  }

  @Get('/task/:id')
  findAll(@Param('id') taskId: number) {
    return this.service.findAll(taskId);
  }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateSubTaskDto: UpdateSubTaskDto) {
    return this.service.update(+id, updateSubTaskDto);
  }

  @Patch('/order')
  updateOrder(@Body() dtoList: UpdateSubTaskOrderDto[]) {
    return this.service.updateOrder(dtoList);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
