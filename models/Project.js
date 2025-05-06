const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  fundingGoal: Number,
  raisedAmount: { type: Number, default: 0 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'funded'], default: 'pending' }
});
module.exports = mongoose.model('Project', projectSchema);
