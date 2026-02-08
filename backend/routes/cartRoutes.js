const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// POST /carts - Add item to cart (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId: req.user._id,
        items: [{ itemId, quantity: 1 }]
      });
    } else {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.itemId.toString() === itemId
      );

      if (existingItemIndex > -1) {
        // Increment quantity
        cart.items[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        cart.items.push({ itemId, quantity: 1 });
      }
    }

    await cart.save();
    await cart.populate('items.itemId');

    res.status(201).json({
      message: 'Item added to cart successfully',
      cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// GET /carts - Get user's cart (Protected)
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
    
    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// GET /carts/all - List all carts (for admin)
router.get('/all', async (req, res) => {
  try {
    const carts = await Cart.find().populate('userId items.itemId');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching carts' });
  }
});

module.exports = router;
