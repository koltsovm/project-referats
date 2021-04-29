const { Router } = require('express');
const Category = require('../../models/category.model');
const Order = require('../../models/order.model');
const Customer = require('../../models/customer.model');

const router = Router();

router.get('/', async (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }
  const categories = await Category.find(); // находим все категории по которым можно сделать заказ
  res.render('orders/order', { categories });
});

router.get('/fillyourorder', (req, res) => {
  res.render('orders/form', { layout: false });
})

router.post('/', async (req, res) => {
  const user = await Customer.findOne(username);
  const { title, description, deadline, categoryId} = req.body; // получаем заказ и создаем документ с этим заказом
  await Order.create({title, category: categoryId, description, customer: user.id, deadline });
  res.redirect('/');
});



module.exports = router;
