var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../config/swagger.json');
var swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Cranios API',
            version: '1.0.0',
            description: 'API for all backend control of Cranios mobile app ',
        },
    },
    apis: ['routes/users.js'],
}

const specs = swaggerJsdoc(options);

console.log('Use http://localhost:3000/swagger-ui');

router.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));
// router.get('', swaggerUi.setup(swaggerDocument));


module.exports = router;
