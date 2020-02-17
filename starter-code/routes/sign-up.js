const express = require("express");
const signUpRouter = express.Router();
const User = require("./../models/users");
const Cohort = require("./../models/cohorts");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 12;

signUpRouter.post("/",(req,res,next) => {
    const {username, password, cohort} = req.body;

    if (password ==""|| username ==""){
        res.render("sign-up", {errorMessage: "Username and Password are requiered"});
        return;
    }

    // if (zxcvbn(password).score < 3) {
    //     res.render("sign-up", {
    //       errorMessage: "Password too weak, try again"
    //     });
    //     return;
    // }
    User.findOne({userName: username})
    .then(user => {
        if (user){
            console.log("What is user", user);

            res.render("sign-up",{errorMessage: "Username is already exisits"});
            return;
        }
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);
          let cohortData;
            if(cohort === "WebDev 01/20"){
                
                    Cohort.findOne({cohort_name : "webDev",cohort_date : "2020-01-01"})
                    .then((cohortFromDb) => {
                        // console.log('cohortFromDb', cohortFromDb);
                        
                        //  cohortData= cohortFromDb._id ;
                        // return cohortData;
                        User.create({userName: username,password:hashedPassword , cohortDate : cohortFromDb._id})
                        .then((createdUser) => {
                            req.session.currentUser = createdUser
                              res.redirect("index");           
                        }).catch((err) => {
                            console.log(err);
                            res.render("sign-up", {errorMessage : "Error while creating the new user"})
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else if(cohort === "WebDev 04/20"){
                     Cohort.findOne({cohort_name : "webDev",cohort_date : "2020-04-01"})
                    .then((cohortFromDb) => {
                       cohortData = cohortFromDb._id;
                      return cohortData;
                    }).catch((err) => {
                       console.log(err);
                    });
                }
                else if("UX/UI 01/20"){
                      Cohort.findOne({cohort_name : "UX/UI",cohort_date : "2020-01-01"})
                    .then((cohortFromDb) => {
                        cohortData = cohortFromDb._id;
                       return cohortData;
                    }).catch((err) => {
                        console.log(err);
                    });
                 }
                else if(cohort = "UX/UI 04/20"){
                    Cohort.findOne({cohort_name : "UX/UI",cohort_date : "2020-04-01"})
                    .then((cohortFromDb) => {
                        cohortData = cohortFromDb._id;
                       return cohortData;
                    }).catch((err) => {
                        console.log(err);
                    });
                     
            }

            // console.log('cohortData', cohortData);
            
        //     User.create({userName: username,password:hashedPassword , cohortDate : cohortData})
        //   .then((createdUser) => {
        //         res.redirect("index");           
        //   }).catch((err) => {
        //       console.log(err);
        //       res.render("sign-up", {errorMessage : "Error while creating the new user"})
        //   });

    }).catch((err) => {
        console.log(err);
    });


})



signUpRouter.get("/", (req,res,next) => {
    res.render("sign-up");
});

module.exports=signUpRouter;