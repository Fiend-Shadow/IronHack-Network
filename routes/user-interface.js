const express = require('express');
const userInterfaceRouter = express.Router();

const User = require ('./../models/users');
const Post = require ('./../models/posts');
const Cohort = require ('./../models/cohorts');


function isLoggedIn(req, res, next) {
    if (req.session.currentUser) next();
    else res.redirect("/login");
  }

  userInterfaceRouter.get("/", isLoggedIn, (req, res) => {
    const { _id } = req.session.currentUser;

    User.findById({_id})
    .then((loggedInUser) => {
      
      res.render("user-interface",{loggedInUser});
    }).catch((err) => {
      console.log(err);
    });
    
    
  });




userInterfaceRouter
    .post('/', isLoggedIn ,(req, res, next) => {
      const { _id } = req.session.currentUser;

      
        const {postContent , image_url} = req.body;


        Post.create({postContent: postContent, postImg_url: image_url, userId: {_id} })
        .then((createdPost) => {
              res.redirect("user-interface");           
        }).catch((err) => {
            console.log(err);
            res.render("user-interface", {errorMessage : "Error while creating the new post"})
        });


    });








module.exports = userInterfaceRouter;
