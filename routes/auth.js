const express = require("express");
const router = express.Router();
const { userSignupValidator } = require('../validator');
const { signup, signin, signout, requireSignin } = require("../controllers/auth");


/* this is my validator function... {userSignupValidator}
if i add {userSignupValidator} function. I´ll be have other bug 
* on validator it'll say that name is required
userSignupValidator,
*/
router.post("/signup", userSignupValidator, signup );
router.post("/signin", signin );
router.get("/signout", signout );


module.exports = router