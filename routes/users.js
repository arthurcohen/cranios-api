var express = require('express');
var router = express.Router();
const db = require('../models');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await db.User.findAll());
});

router.post('/', async function(req, res, next) {
  const user = await db.User.create(req.body);
  res.send(user);
});

module.exports = router;
