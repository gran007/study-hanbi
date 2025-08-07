import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/00.auth/google-auth-guard';
import { UserService } from 'src/01.user/user.service';
import type { Response, Request } from 'express'
import { GoogleUser } from './auth.service';

@Controller('google')
export class AuthController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get("login")
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request) { }

  @Get("redirect")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request, @Res() res: Response
  ) {

    if (req.user) {
      const { accessToken, refreshToken } = await this.userService.findGoogleDataOrSave(req.user as GoogleUser);
      res.redirect(`http://localhost:${process.env.FE_PORT}/auth?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    } else {
      res.redirect(401, "`http://localhost:${process.env.FE_PORT}/login`");
    }
  }
}
