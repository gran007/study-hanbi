import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from 'src/01.user/entities/user.entity';
// import * as jwt from 'jsonwebtoken'
// import { ConfigService } from "@nestjs/config";

export interface JwtPayload {
  iss: string;
  name: string;
  email: string;
  userId: number;
}

export interface GoogleUser {
  id: number;
  provider: string;
  name: string;
  email: string;
  photo: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly configService: ConfigService
  ) { }

  getToken(user: UserEntity) {
    
    const payload: JwtPayload = {
      iss: "JiraTodoList",
      name: user.name,
      email: user.email,
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "1d",
      secret: process.env.JWT_SECRET_ACCESS_TOKEN_KEY
      // this.configService.get("JWT_SECRET_ACCESS_TOKEN_KEY"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: process.env.JWT_SECRET_REFRESH_TOKEN_KEY
      // this.configService.get("JWT_SECRET_REFRESH_TOKEN_KEY"),
    });

    return { accessToken, refreshToken };
  }

  verify(jwtString: string) {
    try {
      const payload = this.jwtService.verify(jwtString, {
        secret: process.env.JWT_SECRET_ACCESS_TOKEN_KEY as string
      });

      return {
        userId: payload.id,
        email: payload.email,
      }
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
