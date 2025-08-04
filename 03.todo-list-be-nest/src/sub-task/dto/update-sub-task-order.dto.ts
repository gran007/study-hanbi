import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTaskDto } from './create-sub-task.dto';

export class UpdateSubTaskOrderDto extends PartialType(CreateSubTaskDto) {

    readonly id: number;
    readonly orderNo: number;
}
