const { Router } = require('express');
const session = require('express-session');
// const User = require('../../models/');

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
      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        const newUser = await User.create({
          username,
          phone,
          email,
          password,
        });
        req.session.username = newUser.username;

        res.render('entries/index', { username }); // заменить
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
      const existingUser = await User.findOne({ email, password });
      req.session.username = existingUser.username;
      res.redirect('/profile'); // <----- вставить сюда хбс личного кабинета!!!
    } catch (error) {
      res.render('registration/error', {
        errorMessage: 'Упс! Что-то пошло не так..',
        usernameWrong: '-- Нет пользователя с таким email',
        passwordWrong: '--   или паролем',
      });
    }
  });

module.exports = router;
