import * as express from 'express';
import { Receipt } from '../entity/Receipt';
import { getRepository } from 'typeorm';
import { checkAdminRole } from '../middlewares/checkRoles';
import { checkJwt } from '../middlewares/checkJwt';

export const receiptsRouter = express.Router();

/**
 * @swagger
 * 
 * definitions:
 *   NewReceipt:
 *     type: object
 *     required: 
 *       - image
 *     properties:
 *       observation:
 *         type: string
 *       status:
 *         type: number
 *       image:
 *         type: string
 *   Receipt:
 *     allOf:
 *       - $ref: '#/definitions/NewReceipt'
 *       - $ref: '#/definitions/DefaultObj'
 *       - type: object
 */

/**
 * @swagger
 * /receipts:
 *   get:
 *     tags:
 *       - Receipts
 *     description: This should return all receipts
 *     security:
 *       - JWTAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Receipts found
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Receipt'
 *       400:
 *         description: Receipts not found
 */
receiptsRouter.get('/', checkJwt, checkAdminRole, async function(req, res, next) {
  res.send(await getRepository(Receipt).find());
});
