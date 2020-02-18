const express = require("express");
const cohortMembers = express.Router();

cohortMembers.get("/",(req,res,next) => {
    res.render("cohorot-members");
})

module.exports = cohortMembers;