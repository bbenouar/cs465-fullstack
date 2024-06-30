const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user'); // Ensure the path is correct

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    console.log('Missing fields in request');
    return res.status(400).json({ "message": "All fields required to register" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    console.log('User registered successfully');
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(400).json(err);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required to login" });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};