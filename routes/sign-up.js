const express = require("express");
const signUpRouter = express.Router();
const User = require("./../models/users");
const Cohort = require("./../models/cohorts");
const parser = require('../config/cloudinary');

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 12;

signUpRouter.post("/", parser.single('photo'), (req,res,next) => {
    const {username, password, cohort} = req.body;
    let image_url;
    if(req.file){

         image_url = req.file.secure_url;
    }else{
        image_url = "https://cdn.guidingtech.com/media/assets/WordPress-Import/2012/10/Smiley-Thumbnail.png"
    }

    if (password ==""|| username ==""){
        res.render("sign-up", {errorMessage: "Username and Password are requiered"});
        return;
    }

    // if (zxcvbn(password).score < 2) {
    //     res.render("sign-up", {
    //       errorMessage: "Password too weak, try again"
    //     });
    //     return;
    // }

    User.findOne({userName: username})
    .then(user => {
        if (user){
            res.render("sign-up",{errorMessage: "Username is already exisits"});
            return;
        }
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);
          
            cohortArray = cohort.split(" ");
            cohortN = cohortArray[0];
            cohortD = cohortArray[1];
            
                
                    Cohort.findOne({cohort_name : cohortN ,cohort_date : cohortD})
                    .then((cohortFromDb) => {
                        
                        User.create({userName: username , password:hashedPassword , cohortDate : cohortFromDb._id , image_url})
                        .then((createdUser) => {
                            req.session.currentUser = createdUser;
                            const cohortMembers=cohortFromDb.members;
                            cohortMembers.push(createdUser._id);
                            Cohort.updateOne({_id :cohortFromDb._id }, {$set:{members : cohortMembers}})
                            .then(() => {
                                
                              res.redirect("/user-interface");    
                            }).catch((err) => {
                                console.log(err);
                            });
                                    
                        })
                        .catch((err) => {
                            console.log(err);
                            res.render("sign-up", {errorMessage : "Error while creating the new user"})
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
    
               

    }).catch((err) => {
        console.log(err);
    });


})



signUpRouter.get("/", (req,res,next) => {
    res.render("sign-up");
});

module.exports=signUpRouter;