import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { SubTaskEntity } from './entities/sub-task.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SubTaskEntity])
  ],
  controllers: [SubTaskController],
  providers: [SubTaskService],
})
export class SubTaskModule {}
