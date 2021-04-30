const { Router } = require('express');
const Category = require('../../models/category.model');
const Order = require('../../models/order.model');
const Customer = require('../../models/customer.model');
const WorkType = require('../../models/workType.model');

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
  if (req.session.user_status === 'customer') {
    const user = await Customer.findOne({ username: req.session.username });
    // получаем заказ и создаем документ с этим заказом
    const { title, description, deadline, category, type } = req.body;
    const categoryId = await Category.findOne({ title: category });
    const typeId = await WorkType.findOne({ title: type });
    await Order.create({
      title,
      category: categoryId,
      type: typeId,
      description,
      customer: user.id,
      deadline,
    });
  }
  res.redirect('/');
});

// Посмотреть все заказы в категории
router.get('/:id', async (req, res) => {
  const orders = await Order.find({ category: req.params.id }).populate(
    ['customer', 'category'],
  );
  res.render('orders/allOrders', { orders });
});

// Посмотреть конкретный заказ
// router.get('/:id', async (req, res) => {});

module.exports = router;
