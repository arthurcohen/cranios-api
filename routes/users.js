var express = require('express');
var router = express.Router();
const db = require('../models');

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
 * 
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - properties:
 *         id:
 *           type: number
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */


/**
 * @swagger
 * /users:
 *   get:
 *     tags: 
 *       - Cranios
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
router.get('/', async function(req, res, next) {
  res.send(await db.User.findAll());
});


/**
 * @swagger
 * /users:
 *   post:
 *     tags: 
 *       - Cranios
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
 *       422:
 *         description: Failed to save user
 */
router.post('/', async function(req, res, next) {
  const user = await db.User.create(req.body);
  res.send(user);
});

module.exports = router;
