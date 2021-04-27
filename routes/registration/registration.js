const { Router } = require('express');
const Customer = require('../../models/customer.model');
const Executor = require('../../models/executor.model');

const router = Router();

router
  .route('/')
  .get((req, res) => {
    res.render('registration/registration');
  })
  .post(async (req, res) => {
    try {
      const {
        username, phone, email, password,
      } = req.body;
      const existingCustomer = await Customer.findOne({ username });
      const existingExecutor = await Executor.findOne({ username });
      if (!existingCustomer && !existingExecutor) {
        if (req.body.typeuser === 'customer') {
          const newCustomer = await Customer.create({
            username,
            phone,
            email,
            password,
          });
          req.session.username = newCustomer.username;
          req.session.user_status = 'customer';
        } else {
          const newExecutor = await Executor.create({
            username,
            email,
            phone,
            password,
          });
          req.session.username = newExecutor.username;
          req.session.user_status = 'executor';
        }
        res.render('index', { username }); // заменить hbs path если необходимо
      }
    } catch (error) {
      res.render('registration/error', {
        errorMessage: 'Что-то пошло не так!',
        usernameWrong: '-- Логин должен быть уникальным',
        passwordWrong: '-- Поле для ввода пароля не должно быть пустым',
      });
    }
  });

router
  .route('/login')
  .get((req, res) => {
    res.render('registration/login');
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingCustomer = await Customer.findOne({ email, password });
      const existingExecutor = await Executor.findOne({ email, password });
      if (existingCustomer) {
        req.session.username = existingCustomer.username;
        req.session.user_status = 'customer';
      } else {
        req.session.username = existingExecutor.username;
        req.session.user_status = 'execetor';
      }
      res.redirect('/'); // <----- вставить сюда хбс личного кабинета!!!
    } catch (error) {
      res.render('registration/error', {
        errorMessage: 'Упс! Что-то пошло не так..',
        usernameWrong: '-- Нет пользователя с таким email',
        passwordWrong: '--   или паролем',
      });
    }
  });

module.exports = router;
