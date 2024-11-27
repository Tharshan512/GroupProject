var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* Serve the login page */
router.get('/login', function (req, res) {
  res.render('login'); // Make sure you have a 'login.ejs' file in the views folder
});

/* Handle login form submission */
router.post('/auth/login', function (req, res) {
  const { username, password } = req.body;

  // Example authentication logic (replace with database lookup)
  if (username === 'admin' && password === 'password') {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

/* Serve the register page */
router.get('/register', function (req, res) {
  res.render('register'); // Make sure you have a 'register.ejs' file in the views folder
});

/* Handle register form submission */
router.post('/auth/register', function (req, res) {
  const { username, password, email } = req.body;

  // Example registration logic (replace with database save)
  console.log(`Registered user: ${username}, Email: ${email}`);
  res.send('Registration successful!');
});

module.exports = router;
