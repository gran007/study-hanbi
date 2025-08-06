import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateBoardOrderDto } from './dto/update-board-order-.dto';
import { DeleteDto } from '../10.common/dto/delete.dto';

@Controller('board')
@UseGuards(AuthGuard('jwt'))
export class BoardController {
  constructor(private readonly service: BoardService) { }

  @Post()
  create(@Request() req, @Body() dto: CreateBoardDto) {
    dto.userId = req.user.id;
    return this.service.create(dto);
  }

  @Get('/project/:id')
  findAll(@Request() req, @Param('id') projectId: number) {
    return this.service.findAll(req.user.id, projectId);
  }

  @Get('/id/:id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.service.findOne(req.user.id, id);
  }

  @Patch()
  update(@Request() req, @Body() dto: UpdateBoardDto) {
    dto.userId = req.user.id;
    return this.service.update(dto);
  }

  @Patch('/order')
  updateOrder(@Request() req, @Body() dtoList: UpdateBoardOrderDto[]) {
    dtoList.forEach((item) => {
      item.userId = req.user.id;
    })
    return this.service.updateOrder(dtoList);
  }

  @Delete()
  remove(@Request() req, @Body() dto: DeleteDto) {
    dto.userId = req.user.id;
    return this.service.remove(dto);
  }
}
