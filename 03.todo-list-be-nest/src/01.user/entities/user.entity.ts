import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
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

    @CreateDateColumn({ nullable: false })
    createAt: Date;

    @UpdateDateColumn({ nullable: false })
    updateAt: Date;
}
