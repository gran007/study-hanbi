import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateBoardOrderDto } from './dto/update-board-order-.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly service: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.service.create(createBoardDto);
  }

  @Get('/project/:id')
  findAll(@Param('id') projectId: number) {
    return this.service.findAll(projectId);
  }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.service.update(+id, updateBoardDto);
  }

  @Patch('/order')
  updateOrder(@Body() dtoList: UpdateBoardOrderDto[]) {
    return this.service.updateOrder(dtoList);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
