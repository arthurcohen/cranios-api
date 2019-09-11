import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
