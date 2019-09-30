import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from './Transaction';

@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    picture: string;

    @Column()
    city: string;

    @Column()
    participation: number;

    @Column()
    password: string;

    @Column()
    admin: boolean;

    @OneToMany(type => Transaction, transaction => transaction.user)
    transactions: Transaction[];
}
