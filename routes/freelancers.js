const {Router} = require('express');
// const Freelancer = require('../db')
const router = Router();

router.get('/', async (req, res) => {
  const allFreelancers = await Freelancers.find();
  res.render('freelancers', {allFreelancers});
});

module.exports = router;
