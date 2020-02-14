const express = require('express');
const router = express.Router();
const logInRouter = require("./log-in");
const signUpRouter = require("./sign-up")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("./log-in",logInRouter);

router.get("./sign-up",signUpRouter);

module.exports = router;
