import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google-strategy';
import { UserService } from 'src/01.user/user.service';
import { UserEntity } from 'src/01.user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, UserService, AuthService],
})
export class AuthModule { }
