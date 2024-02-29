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
    list.data=list.data.map((obj)=>({...obj,owner:"65d6ed06e16a8ae3be31f6bc"}));
    await listing.insertMany(list.data);
}
initdb();
