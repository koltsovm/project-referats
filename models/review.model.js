// const { Schema, model } = require('mongoose');

// const categorySchema = new Schema(
//   {
//     rating: String,
//     body: String,
//   },
//   { timestamps: true },
// );

// module.exports = model('Category', categorySchema);

const { Schema, model } = require('mongoose');

const fbSchema = new Schema(
  {
    rating: Number,
    body: { type: String },
    executor: { type: Schema.Types.ObjectId, ref: 'Executor' },
  },
);



module.exports = model('FeedBack', fbSchema);
