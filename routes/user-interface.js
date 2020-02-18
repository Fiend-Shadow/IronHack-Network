const express = require('express');
const userInterfaceRouter = express.Router();

const User = require ('./../models/users');
const Post = require ('./../models/posts');
const Cohort = require ('./../models/cohorts');







function isLoggedIn(req, res, next) {
    if (req.session.currentUser) next();
    else res.redirect("/log-in");
  }



  userInterfaceRouter.get("/cohort-members",isLoggedIn, (req,res,next) => {
    res.render("cohorot-members")
  });
  // *     /user-interface/profile
  userInterfaceRouter.get('/profile', isLoggedIn, (req, res, next) => {
    const {_id} = req.session.currentUser;
    console.log('inprofileRoute');
    User.findById({_id}).populate("postIds")
        .then((loggedUser) => {
            res.render("user-profile", {loggedUser});
        })
        .catch((err) => {
            console.log(err);
        });
});

userInterfaceRouter.post('/profile',isLoggedIn, (req, res, next) => {
  const {_id} = req.session.currentUser;
  const {urlLink, descriptionLink} = req.body;
  User.findById({_id})
  .then((currentUserUpdates) => {
      let linkFromDb = currentUserUpdates.links;
      
  }).catch((err) => {
      
  });

});

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




userInterfaceRouter
    .post('/', isLoggedIn ,(req, res, next) => {
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
