const express = require('express');
const userProfileRouter = require ('./user-profile');

const User = require ('./../models/users');
const Post = require ('./../models/posts');
const Cohort = require ('./../models/cohorts');

const userInterfaceRouter = express.Router();

// HELPER FUNCTION
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect("/log-in");
}

/////    NESTED ROUTERS     /////

userInterfaceRouter.use(function(req, res, next) {
  console.log('BANANA')
  next();
  
})

// *     /user-interface/profile
userInterfaceRouter.use('/profile', userProfileRouter);



/////    ROUTES     /////

// GET     /user-interface
userInterfaceRouter.get("/", isLoggedIn, (req, res) => {
  const { _id } = req.session.currentUser;
  console.log("_id : ",_id);
  User.findById({_id})
  .then((loggedInUser) => {
    console.log("loggedInUser :", loggedInUser)
    const cohortDate = loggedInUser.cohortDate;
    console.log("cohortDate :", cohortDate)
    Cohort.findOne({_id:cohortDate})
    .then((currentCohort) => {
        console.log("currentCohort : ", currentCohort);
      let colleagues = currentCohort.members;
          console.log("colleagues ", colleagues);
      const colleaguePrs = colleagues.map((oneCollegue)=>{
        return Post.find({userId : oneCollegue}).populate("userId")
        // .then((postedByUserId) => {
        //   const {postContent , postImg_url} = postedByUserId;
        //   const data = {user:loggedInUser ,posts:{postContent , postImg_url} }
        // })
      })
      const whenAllDonePr= Promise.all(colleaguePrs)
      return whenAllDonePr
    }) 
    .then(allPosts=>{
      console.log(allPosts);
      res.render("user-interface", {allPosts});
    })
  }).catch((err) => {
    console.log(err);
  });
});

// POST    /user-interface
userInterfaceRouter.post('/', isLoggedIn ,(req, res, next) => {
    const { _id } = req.session.currentUser;
      const {postContent , image_url} = req.body;
      Post.create({postContent: postContent, postImg_url: image_url, userId: {_id} })
      .then((createdPost) => {
        const userIdFormCreatedPost= createdPost.userId;
        User.findById({_id: userIdFormCreatedPost})
        .then((userPosting) => {
          const postForiegnKey = userPosting.postIds;
          postForiegnKey.push(createdPost._id);
          User.updateOne({_id:userPosting._id}, {$set: {postIds:postForiegnKey}})
          .then((result) => {
            res.redirect("user-interface"); 
          })
        }).catch((err) => {
        });
      }).catch((err) => {
          console.log(err);
          res.render("user-interface", {errorMessage : "Error while creating the new post"})
      });
});

module.exports = userInterfaceRouter;

