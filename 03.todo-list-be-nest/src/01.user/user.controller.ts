import { 
  Controller, 
  Get, 
  Delete, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/')
  findOne(@Request() req) {
    const { providerId, email, name, profileImage } = req.user;
    return {
      providerId, 
      email, 
      name, 
      profileImage
    };
  }

  @Delete()
  remove(@Request() req) {
    return this.service.remove(req.user.id);
  }
}
