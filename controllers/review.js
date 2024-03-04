const listing=require("../models/index");
const review=require("../models/review");

//review adding
module.exports.add=async (req, res) => {
    let list = await listing.findById(req.params.id);
    // console.log(list);
    let newreview = new review(req.body.review);
    // console.log(newreview);
    newreview.author=req.user.id;
    // console.log(newreview.author)
    list.reviews.push(newreview);
    await newreview.save();
    await list.save();
    req.flash("success","Review added Successfully");
    res.redirect(`/listings/show/${req.params.id}`);

}

//deleting review
module.exports.delete=async(req,res)=>{
    let {id,reviewid}=req.params;
    // console.log(id+" "+reviewid);
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await review.findByIdAndDelete(reviewid);
    req.flash("success","Review deleted Successfully");
    res.redirect(`/listings/show/${id}`);
}