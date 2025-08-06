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

  setCookie(res: Response, key: string, value: string, day: number) {
    res.cookie(key, value, {
        expires: new Date(Date.now() + (3600 * 1000 * 24 * day)),
        httpOnly: true, // 자바스크립트로 접근 불가
        secure: true, // HTTPS로만 전송
        // sameSite: "strict", // 같은 사이트에서만 전송
      });
  }

  @Get("redirect")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request, @Res() res: Response
  ) {

    if (req.user) {
      const { accessToken, refreshToken } = await this.userService.findGoogleDataOrSave(req.user as GoogleUser);
      this.setCookie(res, "access_token", accessToken, 1);
      this.setCookie(res, "refresh_token", refreshToken, 7);
      res.redirect(`http://localhost:${process.env.FE_PORT}`);
    } else {
      res.redirect(401, "`http://localhost:${process.env.FE_PORT}/login`");
    }
  }
}
