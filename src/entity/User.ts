import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from './Transaction';
import { News } from "./News";

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

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    city: string;

    @Column()
    participation: number;

    @Column()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(type => Transaction, transaction => transaction.user)
    transactions: Transaction[];

    @OneToMany(type => News, news => news.user)
    news: News[];
}
