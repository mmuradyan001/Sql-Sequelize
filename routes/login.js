require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/users');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ error: 'Email or password is incorrect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_WORD, { expiresIn: '1d' });
      res.json({
        message: 'Successfully login!',
        token,
      });
    } else {
      res.json({ error: 'Email or password is incorrect' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.json(error);
  }
});

module.exports = router; 



