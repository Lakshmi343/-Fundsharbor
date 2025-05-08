
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  investedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Investment', investmentSchema);
