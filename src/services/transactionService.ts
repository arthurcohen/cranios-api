import { Transaction } from "../entity/Transaction";
import { getRepository } from "typeorm";

export class TransactionService {
    private static async persistTransaction(userId: number, newTransaction: Transaction): Promise<Transaction> {
        const transaction = await getRepository(Transaction)    
            .save(newTransaction);

        return transaction;
    }
}
