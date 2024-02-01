var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/users')


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    if(users){
      res.json(users);
    }
  } catch (error) {
    res.json(error);
  }
});



router.post('/', async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const exciting = await User.findOne({ where: {email}})

  try {
    if(exciting){
      res.json({
        error:'User already exists'
      })
    }else{
      const hash = await bcrypt.hash(password,8)
      const newUser =  await User.create({
        name,
        lastname,
        email,
        password:hash,
      });
  
      console.log('User registered successfully:', newUser.toJSON());
      res.json({ 
        message: 'User registered successfully' 
      });
    }
  } catch (error) {
    console.error('Error registering user:', error.message);  
    res.json({ error:error });
  }
});

module.exports = router;


