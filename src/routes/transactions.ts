import * as express from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';
import { TransactionService } from '../services/transactionService';
import { ReceiptService } from '../services/receiptService';
export const transactionsRouter = express.Router();


/**
 * @swagger
 * definitions:
 *   NewTransaction:
 *     type: object
 *     required:
 *       - value
 *       - type
 *       - receipt
 *       - user
 *     properties:
 *       value:
 *         type: number
 *       type:
 *         type: number
 *   Transaction:
 *     allOf:
 *       - $ref: '#/definitions/NewTransaction'
 *       - $ref: '#/definitions/DefaultObj'
 *     properties:
 *       receipt:
 *         $ref: '#/definitions/Receipt'
 *       user:
 *         $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     description: This should return all transactions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Transactions found
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Transaction'
 *       404:
 *         description: Transactions not found
 */
transactionsRouter.get('/', async function(req, res, next) {
  res.send(await getRepository(Transaction).find());
});


/**
 * @swagger
 * /transactions/{transactionId}/receipts:
 *   post:
 *     tags:
 *       - Receipts
 *     description: This should persist a new receipt for a transaction
 *     produces: 
 *       - application/json
 *     parameters:
 *       - name: Receipt
 *         required: true
 *         in: body
 *         schema: 
 *           $ref: '#/definitions/NewReceipt'
 *       - name: transactionId
 *         in: path
 *         description: Transaction id
 *         require: true
 *         type: number
 *     responses:
 *       201: 
 *         description: Receipt successfully created
 *         schema:
 *           $ref: '#/definitions/Receipt'
 *       422:
 *         description: The receipt object is invalid
 * 
 */
transactionsRouter.post('/:transactionId/receipts', async function(req, res, next) {
  const transaction = await TransactionService.findTransaction(parseInt(req.params.transactionId));

  let receipt;

  if (transaction) {
    receipt = await ReceiptService.persistReceipt(transaction[0], req.body);
  }

  res.status(receipt ? 201 : 422);
  res.send(receipt);
});
