import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteDto } from '../10.common/dto/delete.dto';
import { User } from 'src/10.common/decorator/user.decorator';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  create(@User() user, @Body() dto: CreateProjectDto
  ) {
    dto.userId = user.id;
    return this.service.create(dto);
  }

  @Get('/user')
  findAll(@User() user) {
    return this.service.findAll(user.id);
  }

  @Get('/id/:id')
  findOne(@User() user, @Param('id') id: number) {
    return this.service.findOne(user.id, id);
  }

  @Patch()
  update(@User() user, @Body() dto: UpdateProjectDto
  ) {
    dto.userId = user.id;
    return this.service.update(dto);
  }

  @Delete()
  remove(@User() user, @Body() dto: DeleteDto) {
    dto.userId = user.id;
    return this.service.remove(dto);
  }
}
