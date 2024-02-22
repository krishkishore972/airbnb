const {listschema}=require("./schema")
const {reviewschema } = require("./schema");
const expresserror = require("./utils/error");

//log in check
module.exports.islogin=(req,res,next)=>{
    console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated()){
        req.flash("error","Log in or sign up");
       return res.redirect("/login");
    }
    next();
}

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
    console.log(error)
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        console.log(errmsg);
        throw new expresserror(400, errmsg);
    } else {
        next();
    }
}
 