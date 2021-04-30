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
  console.log(id);
  const executor = await Executor.findById(id).populate('categories');
  res.render('executor/executor', { executor });
});

router.post('/:id', async (req, res) => {
  // const { email } = req.body;
  const { rating, feedback, email } = req.body;
  console.log(rating);
  // console.log('email ----->', email);
  // console.log('reqbody ручка /:id: ', req.body);

  const checkCustomer = await Customer.findOne({ email });
  if (checkCustomer) {
    const { id } = req.params; // executor id должен совпадать со схемой
    await FeedBack.create({ rating, body: feedback, executor: id });
    const allFeedbacks = await FeedBack.find({ executor: id }); // поиск по айди исп
    // const allRaitingThisExecutor = findEx.find({ rating });
    // console.log(allRaitingThisExecutor);
    const arithmeticMean = allFeedbacks
      .reduce((sum, value) => sum + Number(value.rating), 0) / allFeedbacks.length;
    console.log(arithmeticMean);
    const mathRound = Math.round(arithmeticMean);
    await Executor.findByIdAndUpdate(id, { rating: mathRound });
    // ср арифм всех отзывов
    // обновление графы rating
  }
  // res.send(req.body.feedback);
  res.json({ fbFromJson: `${req.body.feedback}` });
});

module.exports = router;
