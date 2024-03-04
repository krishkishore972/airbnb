const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync = require("../utils/wrapfn");
const {validator1}=require("../middleware");
const {islogin,isauthor}=require("../middleware")
const reviewcontroller=require("../controllers/review");
//Review route
router.post("/add",validator1,wrapasync(reviewcontroller.add));


//Review delete
router.delete("/:reviewid",islogin,isauthor,wrapasync(reviewcontroller.delete));

module.exports=router;