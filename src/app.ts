import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import { indexRouter } from './routes/index';
import { swaggerRouter } from './routes/swagger';
import { usersRouter } from './routes/users';
import { receiptsRouter } from './routes/receipts';
// var usersRouter = require('./routes/users');
// var transactionsRouter = require('./routes/transactions');

// var swaggerRouter = require('./routes/swagger');
import "reflect-metadata";
import {createConnection} from "typeorm";
import { transactionsRouter } from './routes/transactions';
import { checkJwt } from './middlewares/checkJwt';

export const app: express.Application = express();

console.log('before conn');
createConnection().then(async connection => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/swagger-ui', swaggerRouter);
    app.use('/users', usersRouter);
    app.use('/receipts', receiptsRouter);
    app.use('/transactions', transactionsRouter);
}).catch(error => console.log(error));
