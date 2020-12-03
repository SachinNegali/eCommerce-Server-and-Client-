var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const {signout, signup, signin, isSignedIn} = require("../controllers/auth") 


router.post("/signup", [
    check("name", "name should be atleast 3 chars").isLength({min: 3}),
    check("email", "email can't be empty").isEmail(),
    check("password", "password needs to be atleast 4 chars long").isLength({min: 4})
], signup)

router.post("/signin", [
    check("email", "email can't be empty").isEmail(),
    check("password", "password needs to be atleast 4 chars long").isLength({min: 4})
], signin)

router.get("/signout", signout);



module.exports = router;