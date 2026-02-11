const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const FridgePosition = require('../models/fridgePosition');
const mongoose = require('mongoose');
const { authenticate } = require('../middleware/authMiddleware');

// Aggiungi un prodotto
router.post('/', authenticate, async (req, res) => {
  try {
  console.log(req.body);
    const prodotto = new Product({
          ...req.body,
          user: req.user.id // 👈 AGGIUNTO AUTOMATICAMENTE
        });

    await prodotto.save();
    res.status(201).json(prodotto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ottieni tutti i prodotti
router.get('/', authenticate, async (req, res) => {
  try {
    const prodotti = await Product.find({ user: req.user.id })
          .populate('category')
          .populate('fridgePosition');
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
router.put('/qnt/:id', authenticate, async (req, res) => {
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
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }

    res.status(200).json({ message: 'Prodotto eliminato con successo' });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint per le categorie
router.get('/categories', authenticate, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// POST /api/categories
router.post('/categories', authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const categories = new Category({
       ...req.body,
       user: req.user.id // 👈 AGGIUNTO AUTOMATICAMENTE
        });
    await categories.save();
    res.status(201).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/categories/:id
router.delete('/categories/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoria non trovata' });
    }

    res.status(200).json({ message: 'Categoria eliminata con successo', category: deletedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint per le posizioni del frigo
router.get('/fridge-positions', authenticate, async (req, res) => {
  try {
    const fridgePositions = await FridgePosition.find({ user: req.user.id });
    res.json(fridgePositions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching fridge positions' });
  }
});

// POST /api/fridge-positions
router.post('/fridge-positions', authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const fridgePositions = new FridgePosition(
    {
              ...req.body,
              user: req.user.id // 👈 AGGIUNTO AUTOMATICAMENTE
            });
    await fridgePositions.save();
    res.status(201).json(fridgePositions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/fridge-positions/:id
router.delete('/fridge-positions/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFridgePosition = await FridgePosition.findByIdAndDelete(id);

    if (!deletedFridgePosition) {
      return res.status(404).json({ error: 'FridgePosition non trovata' });
    }

    res.status(200).json({ message: 'FridgePosition eliminata con successo'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
