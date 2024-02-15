const express = require("express");
const mongose = require("mongoose");
const app = express();
const path = require("path");
const methodoverride = require("method-override");
const port = 5600;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const listing = require("./models/index");
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);
const wrapasync = require("./utils/wrapfn");
const expresserror = require("./utils/error");
const { listschema } = require("./schema");
const review = require("./models/review");


const main = async () => {
    await mongose.connect("mongodb://127.0.0.1:27017/airbnb");
}
main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err)
})

app.use((req, res, next) => {
    console.log("request recieved");
    next();
})
//validation for schema
const validator = (req, res, next) => {
    let { error } = listschema.validate(req.body);
    console.log(error)
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        console.log(errmsg);
        throw new expresserror(400, errmsg);
    } else {
        next();
    }
}
//establishing the connection
app.listen(port, (req, res) => {
    console.log("listening on port 5600");
})

//home route
app.get("/home", wrapasync(async (req, res) => {
    //    await listing.find().then((result)=>{
    //         res.render("list/home.ejs",{result});
    //     }).catch((err)=>{console.log(err)});
    let result = await listing.find();
    // console.log(result);
    res.render("list/home.ejs", { result });
}));

//show route
app.get("/show/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    // await listing.findById(id).then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    let item = await listing.findById(id);
    // console.log(item);
    res.render("list/show.ejs", { item });
}));

//Review route
app.post("/:id/review", wrapasync(async (req, res) => {
    let list = await listing.findById(req.params.id);
    // console.log(list);
    let newreview = new review(req.body.review);
    // console.log(newreview);
    await listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();

}))

//edit route
app.get("/show/edit/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    let item = await listing.findById(id);
    res.render("list/edit.ejs", { item });
}))
app.patch("/edit/:id", validator, wrapasync(async (req, res) => {
    let { id } = req.params;
    // console.log(req.body.list);
    await listing.findByIdAndUpdate(id, (req.body.list));
    res.redirect(`/show/${id}`);
}))

//add route
app.get("/add", (req, res, next) => {
    res.render("list/add.ejs");
})
app.post("/add", validator, wrapasync(async (req, res) => {
    const List = new listing(req.body.list);
    // console.log(req.body.list);
    await List.save();
    res.redirect("/home");
}))

//delete route
app.delete("/show/delete/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    let deleted = await listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/home");
}));

//invalid route
app.all("*", (req, res, next) => {
    next(new expresserror(404, "page not found"));
})
//error handler
app.use((err, req, res, next) => {
    let { status = 500, message = "somethng went wrong" } = err;
    res.render("list/error.ejs", { err });
    // res.status(status).send(message);
})