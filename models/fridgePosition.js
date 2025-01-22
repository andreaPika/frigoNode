const mongoose = require('mongoose');

const fridgePositionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('FridgePosition', fridgePositionSchema);