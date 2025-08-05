import { TaskEntity } from "src/04.task/entities/task.entity";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity('sub_task')
export class SubTaskEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    userId: number;

    @Column({nullable: false})
    projectId: number;

    @Column({nullable: false})
    taskId: number;

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

    @ManyToOne(() => TaskEntity, (task) => task.subTasks)
        @JoinColumn({name: 'task_id', referencedColumnName: 'id'})
        task: TaskEntity
}
