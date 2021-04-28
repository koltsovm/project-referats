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
      if (req.session.user_status === 'customer') {
        const customer = await Customer.findOne({ username: req.session.username });
        return res.render('profile', { customer });
      }

      if (req.session.user_status === 'executor') {
        const executor = await Executor.findOne({ username: req.session.username });
        return res.render('profile', { executor });
      }
    } catch (error) {
      return res.render('error');
    }

    return res.render('index'); // Добавить обработку на случай если пытается зайти неавторизованный пользователь
  })
  .put(async (req, res) => {
    res.render('profile');
  });

module.exports = router;
