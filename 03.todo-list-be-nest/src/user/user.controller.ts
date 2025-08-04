import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(+id, updateUserDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
