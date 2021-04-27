require('dotenv').config();
const mongoose = require('mongoose');

const path = process.env.DATABASE_STRING;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const dbConnect = () => {
  mongoose.connect(path, options).then(() => {
    console.log('DB connected!');
  });
};

module.exports = dbConnect;
