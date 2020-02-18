const express = require('express');
const userProfileRouter = express.Router();


userProfileRouter.use('/', (req, res, next) => {
    res.render('user-profile')
})



module.exports = userProfileRouter;