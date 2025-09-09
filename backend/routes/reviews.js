const express = require('express');
const router = express.Router();
const db = require('../db');

// Prendere le recensioni di un prodotto
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  db.query('SELECT * FROM reviews WHERE product_id = ?', [productId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore server' });
    res.json(results);
  });
});

// Aggiungere una recensione
router.post('/', (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;

  if (!user_id || !product_id || !rating || !comment) {
    return res.status(400).json({ error: 'Campi mancanti' });
  }

  db.query(
    'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
    [user_id, product_id, rating, comment],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Errore server' });
      res.json({ message: 'Recensione aggiunta', id: result.insertId });
    }
  );
});

module.exports = router;
