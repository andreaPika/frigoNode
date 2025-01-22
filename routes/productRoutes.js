const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const Position = require('../models/position');
const { authenticate } = require('../middleware/authMiddleware');

// Aggiungi un prodotto
router.post('/', authenticate, async (req, res) => {
  try {
  console.log(req.body);
    const prodotto = new Product(req.body);
    await prodotto.save();
    res.status(201).json(prodotto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ottieni tutti i prodotti
router.get('/', authenticate, async (req, res) => {
  try {
    const prodotti = await Product.find().populate('category').populate('position');
    res.json(prodotti);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modifica un prodotto
router.put('/:id', authenticate, async (req, res) => {
  try {
    const prodotto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prodotto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Elimina un prodotto
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Prodotto.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint per le categorie
router.get('/categories', authenticate, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Endpoint per le posizioni del frigo
router.get('/fridge-positions', authenticate, async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching fridge positions' });
  }
});

module.exports = router;
