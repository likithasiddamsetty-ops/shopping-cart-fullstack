const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Item Schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: 'https://via.placeholder.com/150' }
});

const Item = mongoose.model('Item', itemSchema);

// Sample items
const sampleItems = [
  {
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 999.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop'
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&h=200&fit=crop'
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with multiple ports',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=200&fit=crop'
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop'
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam with auto-focus',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop'
  },
  {
    name: 'External SSD 1TB',
    description: 'Portable SSD with 1TB storage',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop'
  },
  {
    name: 'Monitor 27 inch',
    description: '27-inch 4K monitor with HDR',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop'
  }
];

// Add items to database
async function addSampleItems() {
  try {
    // Clear existing items
    await Item.deleteMany({});
    console.log('🗑️  Cleared existing items');

    // Add new items
    await Item.insertMany(sampleItems);
    console.log(`✅ Added ${sampleItems.length} sample items to database`);
    
    console.log('\n📦 Items added:');
    sampleItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding items:', error);
    process.exit(1);
  }
}

addSampleItems();
