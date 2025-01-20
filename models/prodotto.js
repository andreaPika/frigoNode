const mongoose = require('mongoose');

const prodottoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  quantita: { type: Number, required: true, min: 0 },
  dataScadenza: { type: Date, required: true },
  posizione: { type: String, required: true }, // Ad esempio: "Ripiano 2, destra"
});

module.exports = mongoose.model('Prodotto', prodottoSchema);
