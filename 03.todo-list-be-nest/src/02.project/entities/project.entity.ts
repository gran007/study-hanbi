import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { BoardEntity } from "src/03.board/entities/board.entity";

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

    @OneToMany(() => BoardEntity, (board) => board.project, {
        cascade: ['insert']
    })
        boards: BoardEntity[]
}
