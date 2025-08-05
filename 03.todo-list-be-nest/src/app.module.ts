import { Module } from '@nestjs/common';
import { typeORMConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './01.user/user.module';
import { ProjectModule } from './02.project/project.module';
import { BoardModule } from './03.board/board.module';
import { TaskModule } from './04.task/task.module';
import { SubTaskModule } from './05.sub-task/sub-task.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './00.auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    BoardModule,
    TaskModule,
    SubTaskModule,
    TypeOrmModule.forRoot({
      ...typeORMConfig,
      namingStrategy: new SnakeNamingStrategy()
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
