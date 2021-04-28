const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    type: { type: Schema.Types.ObjectId, ref: 'WorkType' },
    description: { type: String, required: true },
    files: String,
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    payment: String,
    deadline: Date,
  },
  { timestamps: true },
);

module.exports = model('Order', orderSchema);
