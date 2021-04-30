require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dbConnect = require('./db/dbConnect');
const indexRouter = require('./routes/index');
const executorsRouter = require('./routes/executors');
const orderRouter = require('./routes/orders/order');
const profileRouter = require('./routes/profile/profile');
const registrationRouter = require('./routes/registration/registration');
const categoriesRouter = require('./routes/categories/category');

const mongoUrl = process.env.DATABASE_STRING;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const options = {
  store: MongoStore.create({ mongoUrl }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 10000 * 60 * 10,
  },
};

const sessionMiddleware = session(options);
app.use(sessionMiddleware);

// Добавляем юзера во все hbs
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.categories = req.session.categories;
  res.locals.executors = req.session.executors;
  next();
});

// Add routers
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/registration', registrationRouter);
app.use('/executors', executorsRouter);
app.use('/orders', orderRouter);
app.use('/categories', categoriesRouter);

// Если HTTP-запрос дошёл до этой строчки,значит ни один из ранее встречаемых рутов не ответил на запрос.
//  Это значит, что искомого раздела просто нет на сайте.
//  Для таких ситуаций используется код ошибки 404.
//  Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(
    404,
    'Запрашиваемой страницы не существует на сервере.',
  );
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку.
  //  В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные,
  //  доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть.
  // В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('registration/error');
});

const { PORT } = process.env;

app.listen(PORT || 3000, () => {
  dbConnect();
  console.log('Server has been started!');
});
