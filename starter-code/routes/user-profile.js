const express = require('express');
const userProfileRouter = express.Router();

userProfileRouter.get('/', (req,res,next) => {
    console.log(userprofileGET)
    res.render('user-profile');
})



module.exports = userProfileRouter;