import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { UpdateSubTaskOrderDto } from './dto/update-sub-task-order.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';
import { User } from 'src/10.common/decorator/user.decorator';

@Controller('sub-task')
@UseGuards(AuthGuard('jwt'))
export class SubTaskController {
  constructor(private readonly service: SubTaskService) { }

  @Post()
  create(@User() user, @Body() dto: CreateSubTaskDto) {
    dto.userId = user.id;
    return this.service.create(dto);
  }

  @Get('/task/:id')
  findAll(@User() user, @Param('id') taskId: number) {
    return this.service.findAll(user.id, taskId);
  }

  @Get('/id/:id')
  findOne(@User() user, @Param('id') id: number) {
    return this.service.findOne(user.id, id);
  }

  @Patch()
  update(@User() user, @Body() dto: UpdateSubTaskDto) {
    dto.userId = user.id;
    return this.service.update(dto);
  }

  @Patch('/order')
  updateOrder(@User() user, @Body() dtoList: UpdateSubTaskOrderDto[]) {
    dtoList.forEach((dto)=>{
      dto.userId = user.id;
    });
    return this.service.updateOrder(dtoList);
  }

  @Delete()
  remove(@User() user, @Body() dto: DeleteDto) {
    dto.userId = user.id;
    return this.service.remove(dto);
  }
}
