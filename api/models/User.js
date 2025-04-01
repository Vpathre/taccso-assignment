const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  location: {
    type: String,
    enum: ['us', 'za', 'uk', 'ca', 'au', 'in'],
    default: 'us',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
