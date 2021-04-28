const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  const { username } = req.session;
  res.render('index', { username });
});

module.exports = router;
