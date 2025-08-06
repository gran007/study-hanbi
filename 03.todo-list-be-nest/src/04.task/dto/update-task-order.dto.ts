import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskOrderDto extends PartialType(CreateTaskDto) {

    userId: number;
    readonly id: number;
    readonly orderNo: number;
}
