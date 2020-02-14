const express = require("express");
const logInRouter = express.Router();
const bcrypt = require("bcrypt");

const User = require("./../models/users");

logInRouter.post("/",(req,res,next) => {
    const { username , password} = req.body;

    if (password === "" || username === ""){
        res.render("log-in",{errorMessage:"Username and Password are requiered !"});
        return;
    }
    User.findOne({userName: username})
    .then((user) => {
        if (!user){
            res.render("log-in",{errorMessage : "The username doesnt exist!"});
        }

        const passwordFromDb = user.password;
        const passwordCorrect = bcrypt.compareSync(password, passwordFromDb);
         if (passwordCorrect){
             req.session.currentUser = user;
             res.redirect("/");
         }
         else {
             res.render("log-in", {errorMessage: "Incorrect password!"});
         }

    }).catch((err) => {
        console.log(err);
    });
    
})


logInRouter.get("/", (req,res,next) => {
    res.render("log-in");
});

module.exports=logInRouter;