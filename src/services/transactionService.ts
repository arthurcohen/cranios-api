import { Transaction } from "../entity/Transaction";
import { getRepository } from "typeorm";

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

    static async persistTransaction(newTransaction: Transaction): Promise<Transaction> {
        const transaction = await getRepository(Transaction).save(newTransaction);

        transaction.user = null;

        return transaction;
    }
}
