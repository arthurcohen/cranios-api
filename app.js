var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const dbConfig = require('./config/config.json')

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.development)
const { User } = require('./models')

// sequelize.authenticate()
//     .then(async () => {
//         console.log('ihu')
//         // let a = await User.create({username: 'cohen', email: 'arthur@gmail', name: 'Arthur', participation: 5.0, password: '123'});
//         // console.log(a);
//         // a.name = 'Arthur 2';
//         // console.log(a);
//         // console.log(await User.findAll());
//     })
//     .catch((err) => console.error('oops', err))

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
