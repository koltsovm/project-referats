require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const dbConnect = require('./db/dbConnect');
const indexRouter = require('./routes/index');
const freelancersRouter = require('./routes/freelancers');
const orderRouter = require('./routes/order')

const mongoUrl = process.env.DATABASE_STRING;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routers
app.use('/', indexRouter);
app.use('/freelancers', freelancersRouter);

const options = {
  store: MongoStore.create({ mongoUrl }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 10,
  },
};

const sessionMiddleware = session(options);

app.use(sessionMiddleware);

const PORT = 3000;

app.listen(PORT || 3000, () => {
  dbConnect();
  console.log('Server has been started!');
});
