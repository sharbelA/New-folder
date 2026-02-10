const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/products', (req, res) => {
  try {
    const data = require('./data/products.json');
    res.json({ products: data });
  } catch (err) {
    res.status(500).json({ error: 'Could not load products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
