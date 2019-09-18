import { User } from "../entity/User";
import { getRepository, getConnection } from "typeorm";
import { Transaction } from "../entity/Transaction";

export class UserService {
    static async persistUser(newUser: User): Promise<User> {      
        // let userMeta = new User();
        // userMeta.name = newUser.name;
        // userMeta.username = newUser.username;
        // userMeta.email = newUser.email;
        // userMeta.picture = newUser.picture;
        // userMeta.participation = newUser.participation;
        // userMeta.city = newUser.city;
        // userMeta.password = newUser.password;
        // userMeta.transactions = [];

        let transactions = newUser.transactions;
        newUser.transactions = [];

        const user = await getRepository(User)
            .save(newUser);
            
        for (let t of transactions) {
            console.log('foreach');
            let transactionMeta = new Transaction();
            transactionMeta.type = t.type;
            transactionMeta.value = t.value;
            transactionMeta.user = user;

            t = await getRepository(Transaction).save(transactionMeta);

            t.user = null;

            newUser.transactions.push(t);
        }

        console.log(newUser);
        // await newUser.transactions.forEach(async (t) => {
        // });



        return user;
    }

    static async findUser(id?: number): Promise<User[]> {
        let userQuery = getRepository(User)
            .createQueryBuilder('user');
        
        if (id) {
            userQuery = userQuery.where('user.id = :id', {id: id});
        }

        const users = await userQuery.leftJoinAndSelect('user.transactions', 'transaction')
            .where('transaction.type = :type', {type: '1'})
            .getMany();

        return users;
    }
}
