const mongose=require("mongoose");
const listing=require("./index");
const list=require("./data");

const main=async()=>{
    await mongose.connect("mongodb://127.0.0.1:27017/airbnb");
}
main().then((res)=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

const initdb=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(list.data);
}
initdb();
