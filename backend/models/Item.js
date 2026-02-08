const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
