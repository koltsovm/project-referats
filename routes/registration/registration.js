const { Router } = require('express');
const Customer = require('../../models/customer.model');
const Executor = require('../../models/executor.model');
const Category = require('../../models/category.model');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const categories = await Category.find();
    console.log(categories);
    res.render('registration/registration', { categories });
  })
  .post(async (req, res) => {
    const {
      firstName,
      lastName,
      username,
      phone,
      email,
      password,
      categories,
      about,
    } = req.body;
    try {
      const existingCustomer = await Customer.findOne({ username, email });
      const existingExecutor = await Executor.findOne({ username, email });
      if (!existingCustomer && req.body.typeuser === 'customer') {
        const newCustomer = await Customer.create({
          username,
          firstName,
          lastName,
          phone,
          email,
          password,
        });
        req.session.username = newCustomer.username;
        req.session.user_status = 'customer';
      }
      if (!existingExecutor && req.body.typeuser === 'executor') {
        const categoriesById = [];
        categories.forEach(async (el) => {
          const cat = await Category.findOne({ title: el });
          categoriesById.push(cat.id);
        });
        const newExecutor = await Executor.create({
          username,
          firstName,
          lastName,
          email,
          password,
          about,
          phone,
          categories: categoriesById,
        });
        req.session.username = newExecutor.username;
        req.session.user_status = 'executor';
      }
    } catch (error) {
      return res.render('registration/error', {
        errorMessage: 'Что-то пошло не так!',
        usernameWrong: '-- Логин должен быть уникальным',
        passwordWrong: '-- Поле для ввода пароля не должно быть пустым',
      });
    }

    return res.render('index', { username }); // заменить hbs path если необходимо
  });

router
  .route('/login')
  .get((req, res) => {
    res.render('registration/login');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingCustomer = await Customer.findOne({ email, password });
      const existingExecutor = await Executor.findOne({ email, password });
      if (existingCustomer) {
        req.session.username = existingCustomer.username;
        req.session.user_status = 'customer';
      }

      if (existingExecutor) {
        req.session.username = existingExecutor.username;
        req.session.user_status = 'executor';
      }

      if (!existingCustomer && !existingExecutor) {
        return res.render('registration/error', {
          errorMessage: 'Упс! Что-то пошло не так..',
          usernameWrong: '-- Нет пользователя с таким email',
          passwordWrong: '--   или паролем',
        });
      }
    } catch (error) {
      res.render('registration/error', {
        errorMessage: 'Упс! Что-то пошло не так..',
        usernameWrong: ' Нет пользователя с таким email',
        passwordWrong: ' или паролем',
      });
    }
    const { username } = req.session;
    return res.render('index', { username }); // <----- вставить сюда хбс личного кабинета!!!
  });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
