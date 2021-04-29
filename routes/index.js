const { Router } = require('express');
const Category = require('../models/category.model');
const Executor = require('../models/executor.model');

const router = Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();
  const executors = await Executor.find();
  req.session.executors = executors;
  req.session.categories = categories;
  res.render('index', { categories, executors });
});

module.exports = router;
