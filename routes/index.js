const { Router } = require('express');
const Category = require('../models/category.model');

const router = Router();

router.get('/', async (req, res) => {
  if (req.session.username) {
    const categories = await Category.find();
    res.locals.categories = categories;
    return res.render('index', { username: req.session.username });
  } else {
    const categories = await Category.find();
    res.locals.categories = categories;
    res.render('index');
  }
});

module.exports = router;
