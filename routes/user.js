const express=require("express");
const { route } = require("./review");
const router=express.Router();
const User=require("../models/user");
const passport = require("passport");
const {saveurl}=require("../middleware")

//signup

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",async(req,res)=>{
   try{
    let {username,email,password}=req.body;
    const newuser=new User({username,email});
    const registeruser=await User.register(newuser,password);
    // console.log(registeruser);
    req.login(registeruser,(err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","user is registered welcome to airbnb");
        res.redirect("/listings/home");
    })
   }catch(e){
    req.flash("eror",e.message);
    res.redirect("/signup");
   }
});
//login
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",saveurl,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),(req,res)=>{
    req.flash("success","Welcome to airbnb");
    console.log(res.locals.currenturl);
    if(res.locals.currenturl){
        return res.redirect(res.locals.currenturl);
    }
    else
    {
        res.redirect("/listings/home");
    }
})
//log out 
router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        else
        {
            req.flash("success","you are logged out");
            res.redirect("/listings/home");
        }
    })
})


module.exports=router;