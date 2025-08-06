import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTaskDto } from './create-sub-task.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {

    userId: number;
    readonly id: number;
    readonly taskId: number;
    readonly priority: number;
    readonly orderNo: number;
    readonly name: string;
}
