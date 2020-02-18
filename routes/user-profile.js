const express = require('express');
const userProfileRouter = express.Router();
const User = require ('./../models/users');
/// Get     /user-profile
userProfileRouter.use('/', (req, res, next) => {
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
/// POST    /user-profile
userProfileRouter.post('/', (req, res, next) => {
    const {_id} = req.session.currentUser;
})
module.exports = userProfileRouter;