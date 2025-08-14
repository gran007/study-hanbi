import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Post,
  Req,
  BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/10.common/decorator/user.decorator';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  remove(@User() user) {
    return this.service.remove(user.id);
  }

  @Post("refresh")
  async refresh(
    @Req() req: Request
  ) {
    const { refreshToken: oldRefreshToken } = req.body;
    if(oldRefreshToken) {
      return await this.service.checkRefreshTokenAndReissueToken(oldRefreshToken);
    } else {
      throw new BadRequestException("no refresh Token exists");
    }
  }
}
