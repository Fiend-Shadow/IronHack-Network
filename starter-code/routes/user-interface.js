const express = require('express');
const userInterfaceRouter = express.Router();

const User = require ('./../models/users');
const Post = require ('./../models/posts');
const Cohort = require ('./../models/cohorts');


function isLoggedIn(req, res, next) {
    if (req.session.currentUser) next();
<<<<<<< HEAD
    else res.redirect("/login");
  }

  userInterfaceRouter.get("/", isLoggedIn, (req, res) => {
    res.render("user-interface");
  });


=======
    else res.redirect("/log-in");
  }
  userInterfaceRouter.get("/", isLoggedIn, (req, res) => {
    res.render("user-interface");
  });
>>>>>>> c75b08b1a9b62e7534ef20e2c08a54f879c469a3
// userInterfaceRouter.use((req,res,next) => {
//     if (req.session.currentUser) {
//         next();
//     } 
//     else  {
//         res.redirect("/login");
//     }
// });
<<<<<<< HEAD

=======
>>>>>>> c75b08b1a9b62e7534ef20e2c08a54f879c469a3
// userInterfaceRouter
//     .get('/', (req,res,next) => {
//         res.render('user-interface')
//     });
<<<<<<< HEAD


userInterfaceRouter
    .post('/', (req, res, next) => {
        const {postContent , image_url , currentUser} = req.body;


        Post.create({postContent: postContent, userId: currentUser._id })
        .then((createdPost) => {
              res.redirect("user-interface");           
        }).catch((err) => {
            console.log(err);
            res.render("user-interface", {errorMessage : "Error while creating the new post"})
        });


    });

=======
// userInterfaceRouter
//     .post('/', (req, res, next) => {
//     });
>>>>>>> c75b08b1a9b62e7534ef20e2c08a54f879c469a3
userInterfaceRouter.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      // cannot access session here
      res.render("log-in");
    });
  });
<<<<<<< HEAD




module.exports = userInterfaceRouter;
=======
module.exports = userInterfaceRouter;
>>>>>>> c75b08b1a9b62e7534ef20e2c08a54f879c469a3
