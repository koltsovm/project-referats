const { Router } = require('express');
const Executor = require('../models/executor.model');
const Customer = require('../models/customer.model');
const FeedBack = require('../models/review.model');

const router = Router();

router.get('/', async (req, res) => {
  const allExecutors = await Executor.find();
  res.render('executor/executors', { allExecutors });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const executor = await Executor.findById(id).populate('categories');
  res.render('executor/executor', { executor });
});

router.post('/:id', async (req, res) => {
  const { rating, feedback, email } = req.body;

  const checkCustomer = await Customer.findOne({ email });
  if (checkCustomer) {
    const { id } = req.params; // executor's id должен совпадать со схемой
    await FeedBack.create({ rating, body: feedback, executor: id });
    const allFeedbacks = await FeedBack.find({ executor: id }); // поиск по id исполнителя

    // среднее арифметическое всех отзывов
    const arithmeticMean = allFeedbacks
      .reduce((sum, value) => sum + Number(value.rating), 0) / allFeedbacks.length;
    const mathRound = Math.round(arithmeticMean);
    // обновление rating
    await Executor.findByIdAndUpdate(id, { rating: mathRound });
  }
  res.json({ fbFromJson: `${req.body.feedback}` });
});

module.exports = router;
