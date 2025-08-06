import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from "src/01.user/user.service";
import { JwtPayload } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload) {
        const { userId } = payload;
        const user = await this.userService.findOne(userId)

        if(!user) {
            throw new UnauthorizedException('no user found');
        }

        return user;
    }
}