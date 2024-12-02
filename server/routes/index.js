var express = require('express');
var router = express.Router();
const User = require('../model/user').User; // Import User model
const passport = require('passport');

/* GET index page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/home', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    message: '' // Pass default or any required data
  });
});


/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('Authentication/login', {
    title: 'Login',
    message: req.flash('loginMessage'),
    displayName: req.user ? req.user.displayName : '',
  });
});
/* POST login page. */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err)
      }
      if (!user) {
          req.flash('loginMessage', 'Authentication Error');
          return res.redirect('/login');
      }
      req.login(user, (err) => {
          if (err) {
              return next(err)
          }
          return res.redirect('/');
      })
  }) (req,res,next)
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
    new User({ username:req.body.username, email:req.body.email, displayName:req.body.displayName }),
    req.body.password,
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

module.exports = router;
