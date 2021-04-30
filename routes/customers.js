const { Router } = require('express');
const Executor = require('../models/executor.model');
const Customer = require('../models/customer.model');
const FeedBack = require('../models/review.model');

const router = Router();

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.render('customers/customer', { customer });
});

module.exports = router;
