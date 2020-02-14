const express = require("express");
const signUpRouter = express.Router();
const User = require("./../models/users");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 12;

signUpRouter.post("/",(req,res,next) => {
    
})



signUpRouter.get("/", (req,res,next) => {
    res.render("./../views/sign-up")
});