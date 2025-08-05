import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/00.auth/google-auth-guard';
import { UserService } from 'src/01.user/user.service';
import { GoogleUser } from 'src/01.user/user.service';
import type { Response } from 'express'

enum CookieExpires {
  EXPIRES_IN_2HOURS = 3600000,
  EXPIRES_IN_7DAYS = 604800000,
}

interface User {
  user: any
}

interface Cookie {
  cookie: Function,
  redirect: Function,
}

export interface JwtPayload {
  iss: string;
  name: string;
  email: string;
  sub: string;
}

@Controller('google')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService,
    ) { }

  @Get("login")
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request) { }

  @Get("redirect")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request & User, @Res() res: Response
  ) {
    // const { user } = req;    
    // console.log(user);
    // return user;
    const user = await this.userService.findGoogleDataOrSave(req.user as GoogleUser);
    const payload: JwtPayload = {
      iss: "TodoList",
      name: user.name,
      email: user.email,
      sub: user.id,
    };

    const { accessToken, refreshToken } = this.authService.getToken(payload);

    const isSuccess = await this.userService.updateRefreshToken(refreshToken);

    if (isSuccess) {
      res.status(200).json({
        accessToken, refreshToken
      })
      // res.cookie("access_token", accessToken, {
      //   expires: new Date(Date.now() + CookieExpires.EXPIRES_IN_2HOURS), // 1시간 후 만료
      //   httpOnly: true, // 자바스크립트로 접근 불가
      //   secure: true, // HTTPS로만 전송
      //   sameSite: "strict", // 같은 사이트에서만 전송
      // });
      // res.cookie("refresh_token", refreshToken, {
      //   expires: new Date(Date.now() + CookieExpires.EXPIRES_IN_7DAYS), // 7일 후 만료
      //   httpOnly: true, // 자바스크립트로 접근 불가
      //   secure: true, // HTTPS로만 전송
      //   sameSite: "strict", // 같은 사이트에서만 전송
      // });
      // res.redirect("https//google.com");
    } else res.redirect(401, "localhost:3000");
  }
}
