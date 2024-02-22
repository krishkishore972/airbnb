const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync = require("../utils/wrapfn");
const review = require("../models/review");
const listing = require("../models/index");
const {validator1}=require("../middleware");

//Review route
router.post("/add",validator1,wrapasync(async (req, res) => {
    let list = await listing.findById(req.params.id);
    // console.log(list);
    let newreview = new review(req.body.review);
    // console.log(newreview);
    list.reviews.push(newreview);
    await newreview.save();
    await list.save();
    req.flash("success","Review added Successfully");
    res.redirect(`/listings/show/${req.params.id}`);

}))


//Review delete
router.delete("/:reviewid",wrapasync(async(req,res)=>{
    let {id,reviewid}=req.params;
    // console.log(id+" "+reviewid);
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await review.findByIdAndDelete(reviewid);
    req.flash("success","Review deleted Successfully");
    res.redirect(`/listings/show/${id}`);
}));

module.exports=router;