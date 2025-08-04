import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>) { }

  async create(createUserDto: CreateUserDto) {

    return await this.repository.save({ ...createUserDto });
  }

  // findAll() {
  //   return this.repository.find();
  // }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repository.update({ id }, { ...updateUserDto });
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
