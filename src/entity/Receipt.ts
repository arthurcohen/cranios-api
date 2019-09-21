import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    observation: string;

    @Column()
    status: number;

    @OneToOne(type => Transaction, transaction => transaction.receipt)
    @JoinColumn()
    transaction: Transaction;
}
