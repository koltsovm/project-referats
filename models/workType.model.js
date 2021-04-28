const { Schema, model } = require('mongoose');

const workTypeSchema = new Schema({
  title: { type: String, required: true },
});

module.exports = model('WorkType', workTypeSchema);
