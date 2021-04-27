const { Router } = require('express');
const Customer = require('../../models/customer.model');
const Executor = require('../../models/executor.model');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    res.render('profile');
    // проверяем статус пользователя - добавить статус в req.session
    // try {
    //   if (req.session.user_status === 'customer') {
    //     const user = await Customer.findOne({ username: req.session.username });
    //     return res.render('profile', { user });
    //   }

    //   if (req.session.user_status === 'executor') {
    //     const user = await Executor.findOne({ username: req.session.username });
    //     return res.render('profile', { user });
    //   }
    // } catch (error) {
    //   return res.render('error');
    // }

    // return res.render('index');
  })
  .put(async (req, res) => {
    res.render('profile');
  });

module.exports = router;
