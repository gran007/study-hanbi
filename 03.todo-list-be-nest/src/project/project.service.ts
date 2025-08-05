import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private repository: Repository<ProjectEntity>
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    const { userId } = createProjectDto;
    return await this.repository.save({ 
      ...createProjectDto,
      boards: [
        { userId, name: 'TODO', orderNo: 0},
        { userId, name: 'IN_PROGRESS', orderNo: 1},
        { userId, name: 'DONE', orderNo: 2},
      ]
    });
  }

  findAll(userId: number) {
    return this.repository.find({
      where: { userId },
      relations: ['boards']
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['boards']
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.repository.update({ id }, { ...updateProjectDto });
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
