const { Router } = require('express');
const multer = require('multer');
const jimp = require('jimp');
const Customer = require('../../models/customer.model');
const Executor = require('../../models/executor.model');
const Category = require('../../models/category.model');

const uploadImage = multer({ dest: './public/img/avatar' });

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const categories = await Category.find();
    res.render('registration/registration', { categories });
  })
  .post(uploadImage.single('avatar'), async (req, res) => {
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

    let avatar = 'default.png';

    if (req.file) {
      jimp
        .read(`${req.file.destination}/${req.file.filename}`)
        .then((image) => {
          image
            .resize(100, 100)
            .quality(70)
            .write(`./public/img/previews/${req.file.filename}`);
        });

      avatar = req.file.filename;
    }

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
        if (categories.length) {
          // eslint-disable-next-line no-restricted-syntax
          for (const item of categories) {
            // eslint-disable-next-line no-await-in-loop
            const cat = await Category.findOne({ title: item });
            categoriesById.push(cat.id);
          }
          // await categories.map(async (el) => {
          //   const cat = await Category.findOne({ title: el });
          //   categoriesById.push(cat.id);
          // });
        } else categoriesById.push(categories);

        const newExecutor = await Executor.create({
          username,
          firstName,
          lastName,
          email,
          password,
          avatar,
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
