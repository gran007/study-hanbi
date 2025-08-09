import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { BoardEntity } from "src/03.board/entities/board.entity";
import { UserEntity } from "src/01.user/entities/user.entity";

@Entity('project')
export class ProjectEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    userId: number;

    @Column({nullable: false})
    name: string;

    @CreateDateColumn({ nullable: false })
    createAt: Date;

    @UpdateDateColumn({ nullable: false })
    updateAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.projects)
    user: UserEntity

    @OneToMany(() => BoardEntity, (board) => board.project, {
        cascade: ['insert']
    })
        boards: BoardEntity[]
}
