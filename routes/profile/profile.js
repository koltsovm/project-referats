const { Router } = require('express');
const Customer = require('../../models/customer.model');
const Executor = require('../../models/executor.model');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    // res.render('profile');
    // проверяем статус пользователя - добавить статус в req.session
    try {
      const { username } = req.session;
      console.log('session====>>>>>>', req.session);
      if (req.session.user_status === 'customer') {
        const customer = await Customer.findOne({
          username: req.session.username,
        });
        return res.render('profile', { customer });
      }

      if (req.session.user_status === 'executor') {
        const executor = await Executor.findOne({
          username: req.session.username,
        });
        return res.render('profile', { executor, username });
      }
    } catch (error) {
      return res.render('error');
    }
    console.log('EXIT');
    return res.render('index'); // Добавить обработку на случай если пытается зайти неавторизованный пользователь
  })
  .put(async (req, res) => {
    // const { username } = req.session;
    res.render('profile');
  });

module.exports = router;
