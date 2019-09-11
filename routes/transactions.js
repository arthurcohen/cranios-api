var express = require('express');
var router = express.Router();
const db = require('../models');


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
 *       receipt:
 *         $ref: '#/definitions/Receipt'
 *       user:
 *         $ref: '#/definitions/User'
 *   Transaction:
 *     allOf:
 *       - $ref: '#/definitions/NewTransaction'
 *       - $ref: '#/definitions/DefaultObj'
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
router.get('/', async function(req, res, next) {
  res.send(await db.Transaction.findAll());
});

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     description: This should persist a new transaction
 *     produces: 
 *       - application/json
 *     parameters:
 *       - name: Transaction
 *         required: true
 *         in: body
 *         schema: 
 *           $ref: '#/definitions/NewTransaction'
 *     responses:
 *       201: 
 *         description: Transaction successfully created
 *         schema:
 *           $ref: '#/definitions/Transaction'
 *       422:
 *         description: The transactions object is invalid
 * 
 */
router.post('/', async function(req, res, next) {
  // TODO: Implement persist logic
  res.send({});
});


module.exports = router;