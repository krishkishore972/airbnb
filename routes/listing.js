const express=require("express");
const router=express.Router();
const wrapasync = require("../utils/wrapfn");
const listing = require("../models/index");
const {islogin,validator, isauthorization}=require("../middleware");
const {saveurl}=require("../middleware")


//home route
router.get("/home", wrapasync(async (req, res) => {
    //    await listing.find().then((result)=>{
    //         res.render("list/home.ejs",{result});
    //     }).catch((err)=>{console.log(err)});
    let result = await listing.find();
    // console.log(result);
    res.render("list/home.ejs", { result });
}));

//show route
router.get("/show/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    // await listing.findById(id).then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    let item = await listing.findById(id).populate("reviews").populate("owner");
    if(!item){
        req.flash("error","list is not exist or deleted");
        res.redirect("/listings/home");
    }
    // console.log(item);
    res.render("list/show.ejs", { item });
}));

//edit route
router.get("/edit/:id",islogin,isauthorization, wrapasync(async (req, res) => {
    let { id } = req.params;
    let item = await listing.findById(id);
    if(!item){
        req.flash("error","list is not exist or deleted");
        res.redirect(`/listings/show/${id}`);
    }
    res.render("list/edit.ejs", { item });
}))
//update route
router.patch("/edit/:id",isauthorization, validator, wrapasync(async (req, res) => {
    let { id } = req.params;
    // console.log(req.body.list);
    await listing.findByIdAndUpdate(id, (req.body.list));
    req.flash("success","List is updated Successfully");
    res.redirect(`/listings/show/${id}`);
}))

//add route
router.get("/add",islogin, (req, res, next) => {
    res.render("list/add.ejs");
})
router.post("/add", validator, wrapasync(async (req, res) => {
    const List = new listing(req.body.list);
    // console.log(req.body.list);
    List.owner=req.user._id;
    await List.save();
    req.flash("success","List is added Successfully");
    res.redirect("/listings/home");
}))

//delete route
router.delete("/delete/:id",islogin,isauthorization,wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    // console.log(deleted);
    req.flash("success","List is deleted Successfully");
    res.redirect("/listings/home");
}));

module.exports=router;
