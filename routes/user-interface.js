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
    Cohort.findOne({members : req.session.currentUser}).populate("members")
    .then((theCohort) => {
      res.render("cohorot-members", {theCohort});
    }).catch((err) => {
      console.log(err);
    });

    
  });
  // *     /user-interface/profile
  userInterfaceRouter.get('/profile', isLoggedIn, (req, res, next) => {
    const {_id} = req.session.currentUser;
    
    User.findById({_id}).populate("postIds")
        .then((loggedUser) => {
            res.render("user-profile", {loggedUser});
        })
        .catch((err) => {
            console.log(err);
        });
});

// userInterfaceRouter.post('/profile',isLoggedIn, (req, res, next) => {
//   const {_id} = req.session.currentUser;
//   const {urlLink, descriptionLink} = req.body;
//   User.findById({_id})
//   .then((currentUserUpdates) => {
//       let linkFromDb = currentUserUpdates.links;
//       linkFromDb.push({url: urlLink, description: descriptionLink});
//         User.updateOne({_id: _id},{$set:{links:linkFromDb}})
//         .then(()=>{
//           res.redirect("/user-interface/profile");
//         });
//   }).catch((err) => {
//       console.log(err);
//   });

// });

userInterfaceRouter.post('/profile',isLoggedIn, (req, res, next) => {
  const {_id} = req.session.currentUser;
  const {urlLink, descriptionLink} = req.body;

  const newLink = {
    url: urlLink,
    description:descriptionLink
  }
  
  
  User.findByIdAndUpdate({_id}, {$push: {links: newLink}},{new:true})
  .then((userUpdated) => {
    
    
    res.redirect("/user-interface/profile");
  }).catch((err) => {
    console.log(err);
    
  });


});

// userInterfaceRouter.get("/profile/delete/:id", isLoggedIn, (req,res,next) => {
//   const {_id} = req.session.currentUser;
//     const deletedLinkId = req.params;
//     let linksArr;
//     User.findById({_id})
//     .then((findedUser) => {
//       console.log(findedUser)
//       for (let i =0 ; i <findedUser.links.length ; i++){
//         if (findedUser.links[i]._id === deletedLinkId){
//           findedUser.links.splice(i,1);
//           linksArr = findedUser.links;
//         }
//         return linksArr;
//       }
//       User.findByIdAndUpdate({_id},{$set : {links : linksArr}},{new :true})
//       .then((updatedUser) => {
//              console.log("updated user", updatedUser);
             
//       })
//       res.redirect("user-interface/profile");
//     }).catch((err) => {
//       console.log(err);
//     });

// })

userInterfaceRouter.get("/profile/delete/:id", isLoggedIn, (req,res,next) => {
  const {_id} = req.session.currentUser;
    const deletedLinkId = req.params;
    let linkToDelete;
    User.findById(_id)
    .then((user)=>{
      linkToDelete = user.links.filter((oneLink)=>{

        return oneLink._id == deletedLinkId.id
      })
      
      
      User.findByIdAndUpdate({_id}, {$pull: {links: linkToDelete[0]}})
      .then((userUpdated) => {
        
        res.redirect("/user-interface/profile");
      }).catch((err) => {
        console.log(err);
      });
      
    })
})


  userInterfaceRouter.get("/", isLoggedIn, (req, res,next) => {

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
        console.log('-------------------------');
        
        console.log('allPosts',allPosts);
        allPosts.reverse();
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
