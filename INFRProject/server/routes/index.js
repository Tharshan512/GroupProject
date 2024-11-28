var express = require('express');
var router = express.Router();
const User = require('../model/user').User; // Import User model
const passport = require('passport');

/* GET index page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
<<<<<<< Updated upstream
/* GET About page. */
router.get('/aboutus', function (req, res, next) {
  res.render('index', { title: 'About us' });
});
/* GET products page. */
router.get('/products', function (req, res, next) {
  res.render('index', { title: 'Products' });
});
/* GET service page. */
router.get('/service', function (req, res, next) {
  res.render('index', { title: 'Service' });
});
/* GET contactus page. */
router.get('/contactus', function (req, res, next) {
  res.render('index', { title: 'Contact Us' });
});
=======
>>>>>>> Stashed changes

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('Authentication/login', {
    title: 'Login',
    message: req.flash('loginMessage'),
    displayName: req.user ? req.user.displayName : '',
  });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('Authentication/register', {
    title: 'Register',
    message: req.flash('registerMessage'),
    displayName: req.user ? req.user.displayName : '',
  });
});

/* POST register page. */
router.post('/register', function (req, res, next) {
  const { username, password, email, displayName } = req.body;

  // Create a new user with passport-local-mongoose
  User.register(
    new User({ username, email, displayName }),
    password,
    (err, user) => {
      if (err) {
        console.error(err);
        req.flash('registerMessage', 'Registration failed. Try again.');
        return res.redirect('/register');
      }

      // Redirect to login page on successful registration
      req.flash('loginMessage', 'Registration successful! Please log in.');
      res.redirect('/login');
    }
  );
});

router.get('/login', function(req, res, next) {
  res.render('Authentication/login', {
      title: 'Login',
      message: req.flash('loginMessage') || '', // Ensure default if undefined
      displayName: req.user ? req.user.displayName : ''
  });
});

module.exports = router;
