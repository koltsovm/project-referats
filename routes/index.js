const { Router } = require('express');
const Category = require('../models/category.model');

const router = Router();

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.locals.categories = categories;
  res.render('index');
});

module.exports = router;
