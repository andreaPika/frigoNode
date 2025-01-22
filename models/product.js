const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  quantity: { type: Number, required: true, min: 0 },
  expiryDate: { type: Date, required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'FridgePosition' }, // Ad esempio: "Ripiano 2, destra"
});

module.exports = mongoose.model('Product', prodottoSchema);
