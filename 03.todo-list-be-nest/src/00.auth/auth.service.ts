import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./auth.controller";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService) {}

    getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "1h",
      secret: this.configService.get("JWT_SECRET_ACCESS_TOKEN_KEY"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
      secret: this.configService.get("JWT_SECRET_REFRESH_TOKEN_KEY"),
    });

    return { accessToken, refreshToken };
  }
}