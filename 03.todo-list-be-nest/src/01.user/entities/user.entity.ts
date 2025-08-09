import { ProjectEntity } from "src/02.project/entities/project.entity";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    providerId: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    name: string;

    @Column()
    profileImage: string;

    @Column()
    refreshToken: string;

    @CreateDateColumn({ nullable: false })
    createAt: Date;

    @UpdateDateColumn({ nullable: false })
    updateAt: Date;

    @OneToMany(() => ProjectEntity, (project) => project.user)
        projects: ProjectEntity[]
}
