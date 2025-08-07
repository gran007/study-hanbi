import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/10.common/decorator/user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Get('/')
  findOne(@User() user) {
    const { providerId, email, name, profileImage } = user;
    return {
      providerId,
      email,
      name,
      profileImage
    };
  }

  @Delete()
  remove(@User() user) {
    return this.service.remove(user.id);
  }
}
