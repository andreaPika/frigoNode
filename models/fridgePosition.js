const mongoose = require('mongoose');

const fridgePositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('FridgePosition', fridgePositionSchema);