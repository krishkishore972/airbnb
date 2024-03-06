const express=require("express");
const router=express.Router();
const wrapasync = require("../utils/wrapfn");
const {islogin,validator, isauthorization}=require("../middleware");
const listcontroller=require("../controllers/listing");
const multer=require("multer");
const {storage}=require("../cloudconfig");
const upload = multer({storage });


//home route
router.get("/home", wrapasync(listcontroller.home));

//filter routes
router.get("/show/filter/:propertyname",wrapasync(listcontroller.filter));

//show route
router.get("/show/:id", wrapasync(listcontroller.show));

//edit and upadate
router.route("/edit/:id")
.get(islogin,isauthorization, wrapasync(listcontroller.editform))
.patch(isauthorization,upload.single('list[image]'), validator, wrapasync(listcontroller.edit));

//add route
router.route("/add")
.get(islogin,listcontroller.addform)
.post(upload.single('list[image]'),validator, wrapasync(listcontroller.add));
// .post(upload.single("list[image]"),(req,res)=>{res.send(req.file)});


//delete route
router.delete("/delete/:id",islogin,isauthorization,wrapasync(listcontroller.delete));

module.exports=router;
