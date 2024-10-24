const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Espresso', price: 5, description: 'Rich and bold espresso', image: 'espresso.jpg' },
  { id: 2, name: 'Cappuccino', price: 6, description: 'Creamy cappuccino', image: 'cappuccino.jpg' },
  { id: 3, name: 'Latte', price: 5.5, description: 'Smooth latte with milk', image: 'latte.jpg' },
];

let cart = [];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Get cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/cart', (req, res) => {
  const { id, quantity } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existingItem = cart.find(item => item.product.id === id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  res.json(cart);
});

// Remove item from cart
app.delete('/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(item => item.product.id !== productId);
  res.json(cart);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
