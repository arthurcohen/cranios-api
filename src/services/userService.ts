import { User } from "../entity/User";
import { getRepository, getConnection } from "typeorm";
import { Transaction } from "../entity/Transaction";

export class UserService {
    static async persistUser(newUser: User): Promise<User> {      

        const user = await getRepository(User).save(newUser);

        return user;
    }

    static async findUser(id?: number): Promise<User[]> {
        let userQuery = getRepository(User)
            .createQueryBuilder('user');
        
        if (id) {
            userQuery = userQuery.where('user.id = :id', {id: id});
        }

        const users = await userQuery
            .leftJoinAndSelect('user.transactions', 'transaction')
            .leftJoinAndSelect('transaction.receipt', 'receipt')
            .getMany();

        return users;
    }
}
