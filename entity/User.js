const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nama: { type: String, required: true },
  jenis_kelamin: { type: String, required: true, enum: ['l', 'p'] },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', schema);