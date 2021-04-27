const { Schema, model } = require('mongoose');

const customerSchema = new Schema(
  {
    username: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    rating: Number,
    rewiews: [{ type: Schema.Types.ObjectId, ref: 'Rewiew' }],
  },
  { timestamps: true }
);

module.exports = model('Customer', customerSchema);
