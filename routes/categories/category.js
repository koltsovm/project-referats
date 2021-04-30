const { Router } = require('express');
const Executor = require('../../models/executor.model');

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const executors = await Executor.find({ categories: id });
  const filteredExecutors = executors.reduce((accum, executor) => {
    accum.push({
      id: executor.id,
      username: executor.username,
      firstName: executor.firstName,
      lastName: executor.firstName,
      avatar: executor.avatar,
    });
    return accum;
  }, []);
  res.render('categories/specificCategory', { filteredExecutors });
});

module.exports = router;
