const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Your User schema
const passport = require('passport'); // Optional: If using Passport.js for authentication

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('Authentication/login', {
    title: 'Login',
    message: req.flash('loginMessage'),
    displayName: req.user ? req.user.displayName : '',
  });
});

/* GET register page. */
router.get('/register', (req, res, next) => {
  res.render('Authentication/register', {
    title: 'Register',
    message: req.flash('registerMessage'),
    displayName: req.user ? req.user.displayName : '',
  });
});

/* POST register page. */
router.post('/register', async (req, res) => {
  const { username, password, email, displayName } = req.body;

  // Validate input
  if (!username || !password || !email || !displayName) {
    req.flash('registerMessage', 'All fields are required!');
    return res.redirect('/register');
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('registerMessage', 'Username is already taken!');
      return res.redirect('/register');
    }

    // Save user to the database
    const newUser = new User({
      username,
      password, // Note: Store hashed passwords (e.g., bcrypt) instead of plain text
      email,
      displayName,
    });

    await newUser.save();

    // Redirect to login with a success message
    req.flash('loginMessage', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('registerMessage', 'An error occurred during registration. Please try again.');
    res.redirect('/register');
  }
});

module.exports = router;
