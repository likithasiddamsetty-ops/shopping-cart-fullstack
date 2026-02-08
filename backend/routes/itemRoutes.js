const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST /items - Create a new item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ error: 'Name, description, and price are required' });
    }

    const item = new Item({
      name,
      description,
      price,
      imageUrl
    });

    await item.save();

    res.status(201).json({
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating item' });
  }
});

// GET /items - List all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

module.exports = router;
