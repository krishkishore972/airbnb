const express=require("express");
const { route } = require("./review");
const router=express.Router();
const passport = require("passport");
const {saveurl}=require("../middleware")
const usercontroller=require("../controllers/user");
//signup
router.route("/signup")
.get(usercontroller.signupform)
.post(usercontroller.signup);
//login
router.route("/login")
.get(usercontroller.loginform)
.post(saveurl,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),usercontroller.login);
//log out 
router.get("/logout",usercontroller.logout);


module.exports=router;