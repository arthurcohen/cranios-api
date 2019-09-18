import * as express from 'express';
import { getRepository, Transaction } from 'typeorm';
import { User } from '../entity/User';
import { UserService } from '../services/userService';
// const db = require('../models');

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
 *       transactions: 
 *         type: array
 *         items:
 *           $ref: '#/definitions/Transaction'
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - $ref: '#/definitions/DefaultObj'
 *       
 */


/**
 * @swagger
 * /users:
 *   get:
 *     tags: 
 *       - Users
 *     description: This should return all users
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
usersRouter.get('/', async function(req, res, next) {
  // res.send(await db.User.findAll());
  const users = await UserService.findUser();

  res.status(users.length > 0 ? 200 : 404);

  res.send(users);
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: 
 *       - Users
 *     description: This should return the user for a specific id
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User id
 *         require: true
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
usersRouter.get('/:userId', async (req, res, next) => {
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
