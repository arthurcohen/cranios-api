import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    header: string;

    @Column()
    body: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    headerImage: string;

    @ManyToOne(type => User, user => user.news)
    @JoinColumn()
    user: User;
}
