import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { checkJwt, JWT_HEADER, SECRET } from '../middlewares/checkJwt';
import { checkAdminRole } from '../middlewares/checkRoles';
import { NewsService } from '../services/newsService';

export const newsRouter = express.Router();

/**
 * @swagger
 *
 * definitions:
 *   NewNews:
 *     type: object
 *     required:
 *       - header
 *       - body
 *       - headerImage
 *     properties:
 *       header:
 *         type: string
 *       body:
 *         type: string
 *       image:
 *         type: string
 *       headerImage:
 *         type: string
 *   News:
 *     allOf:
 *       - $ref: '#/definitions/NewNews'
 *       - $ref: '#/definitions/DefaultObj'
 *     properties:
 *       author: 
 *         $ref: '#/definitions/NewUser'
 */


/**
 * @swagger
 * /news:
 *   get:
 *     tags: 
 *       - News
 *     description: This should return all news
 *     security:
 *       - JWTAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All news
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/News'
 *       404:
 *         description: No news found
 */
newsRouter.get('/', async function (req, res, next) {
      const news = await NewsService.findNews();

      res.status(news.length > 0 ? 200 : 404);

      res.send(news);
});


