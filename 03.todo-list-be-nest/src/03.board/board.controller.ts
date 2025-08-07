import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateBoardOrderDto } from './dto/update-board-order-.dto';
import { DeleteDto } from '../10.common/dto/delete.dto';
import { User } from 'src/10.common/decorator/user.decorator';

@Controller('board')
@UseGuards(AuthGuard('jwt'))
export class BoardController {
  constructor(private readonly service: BoardService) { }

  @Post()
  create(@User() user, @Body() dto: CreateBoardDto) {
    dto.userId = user.id;
    return this.service.create(dto);
  }

  @Get('/project/:id')
  findAll(@User() user, @Param('id') projectId: number) {
    return this.service.findAll(user.id, projectId);
  }

  @Get('/id/:id')
  findOne(@User() user, @Param('id') id: number) {
    return this.service.findOne(user.id, id);
  }

  @Patch()
  update(@User() user, @Body() dto: UpdateBoardDto) {
    dto.userId = user.id;
    return this.service.update(dto);
  }

  @Patch('/order')
  updateOrder(@User() user, @Body() dtoList: UpdateBoardOrderDto[]) {
    dtoList.forEach((item) => {
      item.userId = user.id;
    })
    return this.service.updateOrder(dtoList);
  }

  @Delete()
  remove(@User() user, @Body() dto: DeleteDto) {
    dto.userId = user.id;
    return this.service.remove(dto);
  }
}
