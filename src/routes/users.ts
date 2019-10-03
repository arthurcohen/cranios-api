import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { TransactionService } from '../services/transactionService';
import { checkJwt, JWT_HEADER, SECRET } from '../middlewares/checkJwt';
import { checkAdminRole } from '../middlewares/checkRoles';

export const usersRouter = express.Router();

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - email
 *       - username
 *       - password
 *       - name
 *     properties:
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       name:
 *         type: string
 *       picture:
 *         type: string
 *       city:
 *         type: string
 *       participation:
 *         type: number
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - $ref: '#/definitions/DefaultObj'
 *     properties:
 *       transactions: 
 *         type: array
 *         items:
 *           $ref: '#/definitions/Transaction'
 */


/**
 * @swagger
 * /users:
 *   get:
 *     tags: 
 *       - Users
 *     description: This should return all users
 *     security:
 *       - JWTAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       404:
 *         description: No users found
 */
usersRouter.get('/', checkJwt, checkAdminRole, async function(req, res, next) {
  // res.send(await db.User.findAll());
  const users = await UserService.findUser();

  res.status(users.length > 0 ? 200 : 404);

  res.send(users);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: 
 *       - Users
 *     description: This should authenticate an user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         required: true
 *         in: body
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: User authenticated
 *         schema:
 *           $ref: '#/definitions/User'
 *       403:
 *         description: Failed to save user
 */
usersRouter.post('/login', async (req, res, next) => {
  const user = await UserService.findUserByUsername(req.body.username);
  
  let token = null;
  let status = 403;

  if (user.password === req.body.password) {
    token = jwt.sign({user: user}, SECRET, {expiresIn: 3600});
    status = 200;
    res.setHeader(JWT_HEADER, token);
  }

  res.status(status);
  res.send();
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: 
 *       - Users
 *     description: This should return the user for a specific id
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User id
 *         required: true
 *         type: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User found
 *         schema: 
 *           $ref: '#/definitions/User'
 *       404:
 *         description: No user found
 */
usersRouter.get('/:userId', checkJwt, async (req, res, next) => {
  const user = await UserService.findUser(parseInt(req.params.userId));

  res.status((user && user[0]) ? 200 : 404);

  res.send(user[0]);
});


/**
 * @swagger
 * /users:
 *   post:
 *     tags: 
 *       - Users
 *     description: This should create an user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         required: true
 *         in: body
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: User created
 *         schema:
 *           $ref: '#/definitions/User'
 *       422:
 *         description: Failed to save user
 */
usersRouter.post('/', async function(req, res, next) {
  const user = await UserService.persistUser(req.body);
  
  res.send(user);
});

/**
 * @swagger
 * /users/{userId}/transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     description: This should persist a new transaction
 *     security:
 *       - JWTAuth: []
 *     produces: 
 *       - application/json
 *     parameters:
 *       - name: Transaction
 *         required: true
 *         in: body
 *         schema: 
 *           $ref: '#/definitions/NewTransaction'
 *       - name: userId
 *         in: path
 *         description: User id
 *         required: true
 *         type: number
 *     responses:
 *       201: 
 *         description: Transaction successfully created
 *         schema:
 *           $ref: '#/definitions/Transaction'
 *       422:
 *         description: The transactions object is invalid
 * 
 */
usersRouter.post('/:userId/transactions', checkJwt, async function(req, res, next) {
  const user = await UserService.findUser(parseInt(req.params.userId));

  let transaction;

  if (user) {
    transaction = await TransactionService.persistTransaction(user[0], req.body);
  }

  res.status(transaction ? 201 : 422);
  res.send(transaction);
});
