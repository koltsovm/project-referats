const { Router } = require('express');
const Categoris = require('../../models/category.model');

const router = Router();

router.get('/', async (req, res) => {
  const categories = await Categoris.find();
  res.render('find', { categories });
});

module.exports = router;
