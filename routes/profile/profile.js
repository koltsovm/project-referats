const { Router } = require('express');

const router = Router();

router
  .route('/')
  .get((req, res) => {
    res.render('index');
  })
  .put((req, res) => {
    res.render('profile');
  });

module.exports = router;
