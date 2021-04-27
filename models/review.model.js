const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    rating: String,
    body: String,
  },
  { timestamps: true },
);

module.exports = model('Category', categorySchema);
