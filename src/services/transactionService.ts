import { Transaction } from "../entity/Transaction";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class TransactionService {
    static async findTransaction(id?: number): Promise<Transaction[]> {
        let transactionQuery = getRepository(Transaction)
            .createQueryBuilder('transaction');
        
        if (id) {
            transactionQuery = transactionQuery.where('transaction.id = :id', {id: id});
        }

        const transaction = await transactionQuery.getMany();

        return transaction;
    }

    static async persistTransaction(user: User, newTransaction: Transaction): Promise<Transaction> {
        newTransaction.user = user;

        const transaction = await getRepository(Transaction).save(newTransaction);

        return transaction;
    }
}
