var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET About page. */
router.get('/aboutus', function(req, res, next) {
  res.render('index', { title: 'About us' });
});
/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
});
/* GET service page. */
router.get('/service', function(req, res, next) {
  res.render('index', { title: 'Service' });
});
/* GET contactus page. */
router.get('/contactus', function(req, res, next) {
  res.render('index', { title: 'Contact Us' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('Authentication/login',
    {
      title:'Login',
      message:req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName:''
    });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('Authentication/register',
    {
      title:'Register',
      message:req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName:''
    });
});


module.exports = router;
