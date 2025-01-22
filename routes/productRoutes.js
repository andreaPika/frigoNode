const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const FridgePosition = require('../models/fridgePosition');

// Aggiungi un prodotto
router.post('/', async (req, res) => {
  try {
  console.log(req.body);
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
    const prodotti = await Prodotto.find().populate('category').populate('fridgePosition');
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

// Endpoint per le categorie
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Endpoint per le posizioni del frigo
router.get('/fridge-positions', async (req, res) => {
  try {
    const positions = await FridgePosition.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching fridge positions' });
  }
});

module.exports = router;
