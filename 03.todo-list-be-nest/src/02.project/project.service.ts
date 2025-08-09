import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteDto } from 'src/10.common/dto/delete.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private repository: Repository<ProjectEntity>
  ) { }

  async create(dto: CreateProjectDto) {
    const { userId } = dto;
    return await this.repository.save({ 
      ...dto,
      boards: [
        { userId, name: 'TODO', orderNo: 0},
        { userId, name: 'IN_PROGRESS', orderNo: 1},
        { userId, name: 'DONE', orderNo: 2},
      ]
    });
  }

  async findAll(userId: number) {
    return await this.repository.find({
      where: { userId },
      relations: ['user', 'boards']
    });
  }

  async findOne(userId: number, id: number) {
    const project = await this.repository.findOne({
      where: { userId, id },
      relations: ['boards']
    });
    
    if(!project) {
      throw new NotFoundException(`project ${id} not found`)
    }
    return project;
  }

  async update(dto: UpdateProjectDto) {
    const { id, userId } = dto;
    return await this.repository.update({ id, userId }, dto);
  }

  async remove(dto: DeleteDto) {
    return await this.repository.delete(dto);
  }
}
