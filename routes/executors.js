const { Router } = require('express');
const Executor = require('../models/executor.model');
const router = Router();

router.get('/', async (req, res) => {
  const allExecutors = await Executor.find();
  res.render('executors', { allExecutors });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const executor = await Executor.findById(id);
  res.render('executor', { executor });
})

module.exports = router;
