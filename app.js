require('dotenv').config()


const express = require("express");
const mongose = require("mongoose");
const app = express();
const path = require("path");
const methodoverride = require("method-override");
const port = 5600;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
const expresserror = require("./utils/error");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);
const session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");
const passport=require("passport");
const localstrategy=require("passport-local");
const user=require("./models/user");
const User=require("./routes/user");


const Review=require("./routes/review");
const Listing=require("./routes/listing");


let mongo_url="mongodb://127.0.0.1:27017/airbnb";
let db_url=process.env.ATLAS_DB;
const main = async () => {
    await mongose.connect(db_url);
}
main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err)
})

const store=MongoStore.create({
    mongourl:db_url,
    crypto:{
        secret:"mysecretcode",
    },
    touchafter: 24*3600,
})

store.on("error",()=>{
    console.log("error occured",err);
})
const sessionoptions={
    store,
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*100,
        httpOnly:true,
    }
}
app.use((req, res, next) => {
    console.log("request recieved");
    next();
})
app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentuser=req.user;
    next();
})
app.use("/listings",Listing);
app.use("/listings/:id/review",Review);
app.use("/",User);

//establishing the connection
app.listen(port, (req, res) => {
    console.log("listening on port 5600");
})

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