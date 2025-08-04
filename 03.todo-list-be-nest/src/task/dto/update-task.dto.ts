import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    readonly boardId: number;
    readonly priority: number;
    readonly orderNo: number;
    readonly name: string;
}
