const express = require('express');
const router = express.Router();

const logInRouter = require("./log-in");
const signUpRouter = require("./sign-up");
const userInterfaceRouter = require("./user-interface");
const logOutRouter = require("./log-out");
const User = require("./../models/users");

router.use("/log-in",logInRouter);

router.use("/sign-up",signUpRouter);

router.use("/user-interface", userInterfaceRouter)

router.use("/log-out", logOutRouter)

/* GET home page. */
router.get('/',(req, res, next) => {
User.findOne({isAdmin: true}).populate("postIds")
  .then((adminUser) => {
    console.log(adminUser);
    res.render("index",{adminUser});
  }).catch((err) => {
    console.log(err);
  });

});


module.exports = router;
