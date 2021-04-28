const { Schema, model } = require('mongoose');

const executorSchema = new Schema(
  {
    username: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    about: String,
    phone: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    rating: Number,
    rewiews: [{ type: Schema.Types.ObjectId, ref: 'Rewiew' }],
  },
  { timestamps: true },
);

module.exports = model('Executor', executorSchema);
