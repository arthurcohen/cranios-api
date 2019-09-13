import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';

export const swaggerRouter = express.Router();

const options: object = {
    swaggerDefinition: {
        info: {
            title: 'Cranios API',
            version: '1.0.0',
            description: 'API for all backend control of Cranios mobile app ',
        },
    },
    apis: ['src/routes/*.ts'],
}

const specs: object = swaggerJsdoc(options);

console.log('Use http://localhost:3000/swagger-ui');

/**
 * @swagger
 * definitions:
 *   DefaultObj:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       createdAt:
 *         type: string
 *         format: date
 *       updatedAt:
 *         type: string
 *         format: date
 */

swaggerRouter.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs));
