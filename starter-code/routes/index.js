const express = require('express');
const router = express.Router();

const logInRouter = require("./log-in");
const signUpRouter = require("./sign-up");


router.use("/log-in",logInRouter);

router.use("/sign-up",signUpRouter);

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render("index");
});


module.exports = router;
