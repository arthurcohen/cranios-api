import * as express from 'express';
import { getRepository } from 'typeorm';
import { User } from '../src/entity/User';
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
  res.send(await getRepository(User).find());
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
  // const user = await db.User.create(req.body);
  res.send({});
});
