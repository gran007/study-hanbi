import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google-strategy';
import { JwtModule } from "@nestjs/jwt";
import { UserService } from 'src/01.user/user.service';
import { UserEntity } from 'src/01.user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService],
})
export class AuthModule { }
