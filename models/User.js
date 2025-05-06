const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin', 'organizer', 'investor'], default: 'user' },
  isApproved: { type: Boolean, default: true }
});
module.exports = mongoose.model('User', userSchema);
