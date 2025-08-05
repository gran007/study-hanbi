import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.service.create(createProjectDto);
  }

  @Get('/user/:id')
  findAll(@Param('id') userId: number) {
    return this.service.findAll(userId);
  }

  @Get('/id/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch('/id/:id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.service.update(+id, updateProjectDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
