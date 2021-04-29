const { Router } = require('express');
const Category = require('../models/category.model');
const Executor = require('../models/executor.model');

const router = Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();
  req.session.executors = await Executor.find();
  req.session.categories = categories;
  res.render('index');
});

module.exports = router;
