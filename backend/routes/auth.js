const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Registrazione
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name,email,hashed], (err, result) => {
      if(err) return res.status(500).json({ error: 'Errore server' });
      res.json({ message: 'Utente registrato', id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Errore hashing' });
  }
});

// Login
router.post('/login', (req,res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if(err) return res.status(500).json({ error: 'Errore server' });
    if(results.length === 0) return res.status(404).json({ error: 'Utente non trovato' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ error: 'Password errata' });

    res.json({ id: user.id, name: user.name, email: user.email });
  });
});

module.exports = router;
