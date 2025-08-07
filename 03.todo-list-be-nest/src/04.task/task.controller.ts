import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';
import { User } from 'src/10.common/decorator/user.decorator';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly service: TaskService) { }

  @Post()
  create(@User() user, @Body() dto: CreateTaskDto) {
    dto.userId = user.id;
    return this.service.create(dto);
  }

  @Get('/board/:id')
  findAll(@User() user, @Param('id') boardId: number, 
  @Query('priority') priority: number,) {
    return this.service.findAll(user.id, boardId, priority);
  }

  @Get('/id/:id')
  findOne(@User() user, @Param('id') id: number) {
    return this.service.findOne(user.id, id);
  }

  @Patch()
  update(@User() user, @Body() dto: UpdateTaskDto) {
    dto.userId = user.id;
    return this.service.update(dto);
  }

  @Patch('/order')
  updateOrder(@User() user, @Body() dtoList: UpdateTaskOrderDto[]) {
    dtoList.forEach((dto) => {
      dto.userId = user.id;
    })
    return this.service.updateOrder(dtoList);
  }

  @Delete()
  remove(@User() user, @Body() dto: DeleteDto) {
    dto.userId = user.id;
    return this.service.remove(dto);
  }
}
