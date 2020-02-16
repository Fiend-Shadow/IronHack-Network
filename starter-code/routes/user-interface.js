var express = require('express');
var userInterfaceRouter = express.Router();

const User = require ('./../models/users');
const Post = require ('./../models/posts');
const Cohort = require ('./../models/cohorts');

userInterfaceRouter.use((req,res,next) => {
    if (req.session.currentUser) {
        next();
    } 
    else  {
        res.redirect("/login");
    }
});

userInterfaceRouter
    .get('/', (req,res,next) => {
        res.render('user-interface')
    });





// userInterfaceRouter
//     .post('/', (req, res, next) => {

//     });

userInterfaceRouter.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/login");
    })
});




module.export = userInterfaceRouter;
