import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import { Receipt } from "./Receipt";
import { User } from "./User";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    type: number;

    @OneToOne(type => Receipt)
    receipt: Receipt;

    @ManyToOne(type => User, user => user.transactions)
    user: User;
}
