import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserEntity } from './entities/user.entity'
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from 'src/00.auth/auth.service';
import { JwtStrategy } from 'src/00.auth/jwt-strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class UserModule {}
