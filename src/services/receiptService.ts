import { getRepository } from "typeorm";
import { Receipt } from "../entity/Receipt";
import { Transaction } from "../entity/Transaction";

export class ReceiptService {
    static async persistReceipt(transaction: Transaction, newReceipt: Receipt): Promise<Receipt> {      

        newReceipt.transaction = transaction;

        const receipt = await getRepository(Receipt).save(newReceipt);

        return receipt;
    }
}
