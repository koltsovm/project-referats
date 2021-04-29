const { Router } = require('express');
const multer = require('multer');
const jimp = require('jimp');
const Customer = require('../../models/customer.model');
const Executor = require('../../models/executor.model');

const uploadImage = multer({ dest: './public/img/avatar' });

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    // res.render('profile');
    // проверяем статус пользователя - добавить статус в req.session
    try {
      if (req.session.user_status === 'customer') {
        const customer = await Customer.findOne({
          username: req.session.username,
        });
        return res.render('profile', { customer });
      }

      if (req.session.user_status === 'executor') {
        const executor = await Executor.findOne({
          username: req.session.username,
        }).populate('categories');
        return res.render('profile', { executor });
      }
    } catch (error) {
      return res.render('error');
    }
    return res.render('index'); // Добавить обработку на случай если пытается зайти неавторизованный пользователь
  })
  // Загрузка нового аватара
  .post(uploadImage.single('avatarFile'), async (req, res) => {
    if (req.file) {
      jimp
        .read(`${req.file.destination}/${req.file.filename}`)
        .then((image) => {
          image
            .resize(100, 100)
            .quality(70)
            .write(`./public/img/previews/${req.file.filename}`);
        });

      if (req.session.user_status === 'customer') {
        await Customer.findOneAndUpdate(
          { username: req.session.username },
          { avatar: req.file.filename }
        );

        return res.json({ image: `${req.file.filename}` });
      }

      if (req.session.user_status === 'executor') {
        await Executor.findOneAndUpdate(
          { username: req.session.username },
          { avatar: req.file.filename }
        );

        return res.json({ image: `${req.file.filename}` });
      }
    }
    return res.json({ image: `${req.file.filename}` });
  })
  .put(async (req, res) => {
    res.render('profile');
  });

module.exports = router;
