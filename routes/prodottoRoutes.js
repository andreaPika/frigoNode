const express = require('express');
const router = express.Router();
const Prodotto = require('../models/prodotto');

// Aggiungi un prodotto
router.post('/', async (req, res) => {
  try {
    const prodotto = new Prodotto(req.body);
    await prodotto.save();
    res.status(201).json(prodotto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ottieni tutti i prodotti
router.get('/', async (req, res) => {
  try {
    const prodotti = await Prodotto.find();
    res.json(prodotti);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifica un prodotto
router.put('/:id', async (req, res) => {
  try {
    const prodotto = await Prodotto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prodotto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Elimina un prodotto
router.delete('/:id', async (req, res) => {
  try {
    await Prodotto.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
