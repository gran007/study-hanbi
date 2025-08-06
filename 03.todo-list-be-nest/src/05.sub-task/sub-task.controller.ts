import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { UpdateSubTaskOrderDto } from './dto/update-sub-task-order.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';

@Controller('sub-task')
@UseGuards(AuthGuard('jwt'))
export class SubTaskController {
  constructor(private readonly service: SubTaskService) { }

  @Post()
  create(@Request() res, @Body() dto: CreateSubTaskDto) {
    dto.userId = res.user.id;
    return this.service.create(dto);
  }

  @Get('/task/:id')
  findAll(@Request() res, @Param('id') taskId: number) {
    return this.service.findAll(res.user.id, taskId);
  }

  @Get('/id/:id')
  findOne(@Request() res, @Param('id') id: number) {
    return this.service.findOne(res.user.id, id);
  }

  @Patch()
  update(@Request() res, @Body() dto: UpdateSubTaskDto) {
    dto.userId = res.user.id;
    return this.service.update(dto);
  }

  @Patch('/order')
  updateOrder(@Request() res, @Body() dtoList: UpdateSubTaskOrderDto[]) {
    dtoList.forEach((dto)=>{
      dto.userId = res.user.id;
    });
    return this.service.updateOrder(dtoList);
  }

  @Delete()
  remove(@Request() res, @Body() dto: DeleteDto) {
    dto.userId = res.user.id;
    return this.service.remove(dto);
  }
}
