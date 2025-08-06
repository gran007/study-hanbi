import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    userId: number;
    readonly id: number;
    readonly boardId: number;
    readonly priority: number;
    readonly orderNo: number;
    readonly name: string;
}
