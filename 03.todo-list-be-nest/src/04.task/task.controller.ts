import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly service: TaskService) { }

  @Post()
  create(@Request() req, @Body() dto: CreateTaskDto) {
    dto.userId = req.user.id;
    return this.service.create(dto);
  }

  @Get('/board/:id')
  findAll(@Request() req, @Param('id') boardId: number, 
  @Query('priority') priority: number,) {
    return this.service.findAll(req.user.id, boardId, priority);
  }

  @Get('/id/:id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.service.findOne(req.user.id, id);
  }

  @Patch()
  update(@Request() req, @Body() dto: UpdateTaskDto) {
    dto.userId = req.user.id;
    return this.service.update(dto);
  }

  @Patch('/order')
  updateOrder(@Request() req, @Body() dtoList: UpdateTaskOrderDto[]) {
    dtoList.forEach((dto) => {
      dto.userId = req.user.id;
    })
    return this.service.updateOrder(dtoList);
  }

  @Delete()
  remove(@Request() req, @Body() dto: DeleteDto) {
    dto.userId = req.user.id;
    return this.service.remove(dto);
  }
}
