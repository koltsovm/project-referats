const { Router } = require('express');
const Category = require('../../models/category.model');
const Order = require('../../models/order.model');
const Customer = require('../../models/customer.model');
const WorkType = require('../../models/workType.model')

const router = Router();

router.get('/', async (req, res) => {
  if (!req.session.username) {
    return res.redirect('registration/login');
  }
  const categories = await Category.find(); // находим все категории по которым можно сделать заказ
  return res.render('orders/order', { categories });
});

router.get('/fillyourorder', (req, res) => {
  res.render('orders/form', { layout: false });
});

router.post('/', async (req, res) => {
  const user = await Customer.findOne({ username: req.session.username });
  // получаем заказ и создаем документ с этим заказом
  const { title, description, deadline, categoryId, type } = req.body;
  const typeId = await WorkType.findOne({ title: type });
  await Order.create({
    title,
    category: categoryId,
    type: typeId,
    description,
    customer: user.id,
    deadline,
  });
  res.redirect('/');
});

module.exports = router;
