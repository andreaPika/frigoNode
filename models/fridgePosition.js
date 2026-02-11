const mongoose = require('mongoose');

const fridgePositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('FridgePosition', fridgePositionSchema);