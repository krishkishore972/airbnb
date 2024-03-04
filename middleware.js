const {listschema}=require("./schema")
const {reviewschema } = require("./schema");
const expresserror = require("./utils/error");
const Listing=require("./models/index");
const Review = require("./models/review");

//log in check
module.exports.islogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.url=req.originalUrl;
        req.flash("error","Log in or sign up");
       return res.redirect("/login");
    }
    next();
}

//to save the current url
module.exports.saveurl=((req,res,next)=>{
    res.locals.currenturl=req.session.url;
    next();
})

//validation for listing schema
module.exports.validator = (req, res, next) => {
    let { error } = listschema.validate(req.body);
    // console.log(error)
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        // console.log(errmsg);
        throw new expresserror(400, errmsg);
    } else {
        next();
    }
}

//Review validation
module.exports.validator1 = (req, res, next) => {
    let { error } = reviewschema.validate(req.body);
    // console.log(error)
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        console.log(errmsg);
        throw new expresserror(400, errmsg);
    } else {
        next();
    }
}

//authorization of any listings
module.exports.isauthorization=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!res.locals.currentuser._id.equals(listing.owner._id)){
        req.flash("error","you are not the owner");
        return res.redirect(`/listings/show/${id}`);
    }
    // console.log(listing.owner._id);
    // console.log(res.locals.currentuser._id);
    next();
}

//authorization of reviews
module.exports.isauthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review=await Review.findById(reviewid);
    if(!res.locals.currentuser._id.equals(review.author._id)){
        req.flash("error","you are not the owner");
        return res.redirect(`/listings/show/${id}`);
    }
    console.log(review)
    next();
}