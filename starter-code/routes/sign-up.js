const express = require("express");
const signUpRouter = express.Router();
const User = require("./../models/users");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 12;

signUpRouter.post("/",(req,res,next) => {
    const {username, password} = req.body;

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

          User.create({userName: username,password:hashedPassword})
          .then((createdUser) => {
                res.redirect("index");           
          }).catch((err) => {
              console.log(err);
              res.render("sign-up", {errorMessage : "Error while creating the new user"})
          });

    }).catch((err) => {
        console.log(err);
    });


})



signUpRouter.get("/", (req,res,next) => {
    res.render("sign-up");
});

module.exports=signUpRouter;