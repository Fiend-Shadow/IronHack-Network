const express = require("express");
const signUpRouter = express.Router();
const User = require("./../models/users");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 12;

// signUpRouter.post("/",(req,res,next) => {
//     const {username, password} = req.body;

//     if (password ==""|| username ==""){
//         res.render("/sign-up", {errorMessage: "Username and Password are requiered"});
//         return;
//     }
//     if (zxcvbn(password).score < 3) {
//         res.render("auth/signup-form", {
//           errorMessage: "Password too weak, try again"
//         });
//         return;
//     }
//     User.findOne({username})
//     .then((user) => {
//         if (user){
//             console.log("What is user", user);

//             res.render("/sign-up",{errorMessage: "Username is already exisits"});
//             return;
//         }
//           const salt = bcrypt.genSaltSync(saltRounds);
//           const hashedPassword = bcrypt

//     }).catch((err) => {
        
//     });


// })



signUpRouter.get("/", (req,res,next) => {
    res.render("sign-up");
});

module.exports=signUpRouter;