import * as express from 'express';

export const indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  res.json({ title: 'Express' });
});
