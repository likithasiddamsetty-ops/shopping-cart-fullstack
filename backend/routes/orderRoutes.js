const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// POST /orders - Create order from cart (Protected)
router.post('/', auth, async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total amount
    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.itemId.price * item.quantity;
    });

    // Create order
    const order = new Order({
      userId: req.user._id,
      items: cart.items.map(item => ({
        itemId: item.itemId._id,
        quantity: item.quantity
      })),
      totalAmount,
      status: 'completed'
    });

    await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    await order.populate('items.itemId');

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
});

// GET /orders - Get user's orders (Protected)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.itemId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// GET /orders/all - List all orders (for admin)
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId items.itemId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

module.exports = router;
