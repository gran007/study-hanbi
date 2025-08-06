import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteDto } from '../10.common/dto/delete.dto';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateProjectDto
  ) {
    dto.userId = req.user.id;
    return this.service.create(dto);
  }

  @Get('/user')
  findAll(@Request() req) {
    return this.service.findAll(req.user.id);
  }

  @Get('/id/:id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.service.findOne(req.user.id, id);
  }

  @Patch()
  update(@Request() req, @Body() dto: UpdateProjectDto
  ) {
    dto.userId = req.user.id;
    return this.service.update(dto);
  }

  @Delete()
  remove(@Request() req, @Body() dto: DeleteDto) {
    dto.userId = req.user.id;
    return this.service.remove(dto);
  }
}
