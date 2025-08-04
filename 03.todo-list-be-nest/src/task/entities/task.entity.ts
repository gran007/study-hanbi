import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";

import { BoardEntity } from "src/board/entities/board.entity";
import { SubTaskEntity } from "src/sub-task/entities/sub-task.entity";

@Entity('task')
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    userId: number;

    @Column({nullable: false})
    projectId: number;

    @Column()
    boardId: number;

    @Column({nullable: false})
    priority: number;

    @Column({nullable: false})
    orderNo: number;

    @Column({nullable: false})
    name: string;

    @CreateDateColumn({ nullable: false })
    createAt: Date;

    @UpdateDateColumn({ nullable: false })
    updateAt: Date;

    @ManyToOne(() => BoardEntity, (board) => board.tasks)
        @JoinColumn({name: 'board_id', referencedColumnName: 'id'})
        board: BoardEntity

    @OneToMany(() => SubTaskEntity, (subTask) => subTask.task)
            subTasks: SubTaskEntity[]
}
