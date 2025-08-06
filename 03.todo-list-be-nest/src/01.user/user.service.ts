import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService, GoogleUser } from 'src/00.auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private authService: AuthService
  ) { }

  async findGoogleDataOrSave(userInfo: GoogleUser) {
    
    const { provider: providerId, name, email, photo: profileImage } = userInfo;
    
    var user = await this.repository.findOne({ where: { email } });
    if (!user) {
      user = await this.repository.save({ providerId, email, name, profileImage });
    }

    const { accessToken, refreshToken } = this.authService.getToken(user);
    await this.repository.update({ id: user.id }, { refreshToken });
    return { accessToken, refreshToken };
  }

  async create(createUserDto: CreateUserDto) {
    return await this.repository.save({ ...createUserDto });
  }

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
