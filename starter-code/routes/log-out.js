const express = require("express");
const logOutRouter = express.Router();




logOutRouter.get("/", (req, res, next) => {
console.log("bsdkfjlajsd")
    req.session.destroy((err) => {
      res.render("log-in");
    });
  });

  module.exports = logOutRouter;