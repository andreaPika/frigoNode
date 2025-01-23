const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const FridgePosition = require('../models/fridgePosition');
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
    const prodotti = await Product.find().populate('category').populate('fridgePosition');
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

// Aggiorna la quantità di un prodotto
router.put('/qnt/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: 'La quantità non può essere negativa.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Prodotto non trovato.' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server.', error });
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
    const fridgePositions = await FridgePosition.find();
    res.json(fridgePositions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching fridge positions' });
  }
});

module.exports = router;
