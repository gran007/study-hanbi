import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";

import { ProjectEntity } from 'src/02.project/entities/project.entity';
import { TaskEntity } from 'src/04.task/entities/task.entity';


@Entity('board')
export class BoardEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    userId: number;

    @Column({nullable: false})
    projectId: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    orderNo: number;

    @CreateDateColumn({ nullable: false })
    createAt: Date;

    @UpdateDateColumn({ nullable: false })
    updateAt: Date;

    @ManyToOne(() => ProjectEntity, (project) => project.boards)
    @JoinColumn({name: 'project_id', referencedColumnName: 'id'})
    project: ProjectEntity

    @OneToMany(() => TaskEntity, (task) => task.board)
            tasks: TaskEntity[]
}
