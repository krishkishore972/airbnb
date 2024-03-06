const listing=require("../models/index");

//home
module.exports.home=async (req, res) => {
    //    await listing.find().then((result)=>{
    //         res.render("list/home.ejs",{result});
    //     }).catch((err)=>{console.log(err)});
    let result = await listing.find();
    // console.log(result);
    res.render("list/home.ejs", { result });
}

//show
module.exports.show=async (req, res) => {
    let { id } = req.params;
    // await listing.findById(id).then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    let item = await listing.findById(id).populate({path:"reviews",
populate:"author"}).populate("owner");
    if(!item){
        req.flash("error","list is not exist or deleted");
        res.redirect("/listings/home");
    }
    // console.log(item);
    res.render("list/show.ejs", { item });
}

//edit form render
module.exports.editform=async (req, res) => {
    let { id } = req.params;
    let item = await listing.findById(id);
    if(!item){
        req.flash("error","list is not exist or deleted");
        res.redirect(`/listings/show/${id}`);
    }    
    res.render("list/edit.ejs", { item,originalimage });
}

//updating after edit
module.exports.edit=async (req, res) => {
    let { id } = req.params;
    // console.log(req.body.list);
    let List=await listing.findByIdAndUpdate(id, (req.body.list));
    if(typeof req.file!==undefined){
    let url=req.file.path;
    let filename=req.file.filename;
    List.image.url=url;
    List.image.filename=filename;
    await List.save();
    }
    req.flash("success","List is updated Successfully");
    res.redirect(`/listings/show/${id}`);
}

//add form render
module.exports.addform=(req, res, next) => {
    res.render("list/add.ejs")};

//adding
module.exports.add=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(req.file);
    // console.log(req.body.list);
    const List = new listing(req.body.list);
    
    List.owner=req.user._id;
    List.image.url=url;
    List.image.filename=filename;
    // console.log(List.owner);
    await List.save();
    req.flash("success","List is added Successfully");
    res.redirect("/listings/home");
}

//deleting 
module.exports.delete=async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    // console.log(deleted);
    req.flash("success","List is deleted Successfully");
    res.redirect("/listings/home");
}

module.exports.filter=async(req,res)=>{
    let {propertyname}=req.params;
    let result=await listing.find({category:`${propertyname}`});
    // console.log(result);
    if(result.length>0){
    res.render("list/showfilter.ejs",{result});
    }
    else
    {
        req.flash("error","No Listing available for this filter");
        res.redirect("/listings/home");
    }
}