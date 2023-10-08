

const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {text: {
    type: String,
    required: [true, 'Please describe your goal'],
  }},
  {timestamps: true}
);

module.exports = mongoose.model('Goal', goalSchema);

