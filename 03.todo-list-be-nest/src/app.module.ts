import { Module } from '@nestjs/common';
import { typeORMConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { SubTaskModule } from './sub-task/sub-task.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
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
