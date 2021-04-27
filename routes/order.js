const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  if (!req.session.username_id) {
    return res.redirect('/login');
  }
  const categories = await Category.find(); // находим все категории по которым можно сделать заказ
  res.render('order', { categories });
});

router.post('/', async (req, res) => {
  const { username_id, category, title, budget, description, term } = req.body; // получаем заказ и создаем документ с этим заказом
  // await Order.create()
  res.redirect('');

});

module.exports = router;
