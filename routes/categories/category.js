const Executor = require('../../models/executor.model');
const { Router } = require('express');
const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const executors = await Executor.find({categories: id});
  const filteredExecutors = executors.reduce((accum, executor) => {
    accum.push({
      id: executor.id,
      username: executor.username
    })
    return accum;
  }, []);
  res.render('categories/specificCategory', { filteredExecutors });
});

module.exports = router;