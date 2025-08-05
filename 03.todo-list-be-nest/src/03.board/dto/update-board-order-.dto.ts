import { PartialType } from '@nestjs/mapped-types';
import { BoardEntity } from '../entities/board.entity';

export class UpdateBoardOrderDto extends PartialType(BoardEntity) {

    readonly id: number;
    readonly orderNo: number;
}
