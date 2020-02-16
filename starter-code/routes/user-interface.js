const express = require('express');
const userInterfaceRouter = express.Router();

const User = require ('./../models/users');
const Post = require ('./../models/posts');
const Cohort = require ('./../models/cohorts');


function isLoggedIn(req, res, next) {
    if (req.session.currentUser) next();
    else res.redirect("/log-in");
  }
  userInterfaceRouter.get("/", isLoggedIn, (req, res) => {
    res.render("user-interface");
  });
// userInterfaceRouter.use((req,res,next) => {
//     if (req.session.currentUser) {
//         next();
//     } 
//     else  {
//         res.redirect("/login");
//     }
// });
// userInterfaceRouter
//     .get('/', (req,res,next) => {
//         res.render('user-interface')
//     });
// userInterfaceRouter
//     .post('/', (req, res, next) => {
//     });
userInterfaceRouter.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      // cannot access session here
      res.render("log-in");
    });
  });
module.exports = userInterfaceRouter;