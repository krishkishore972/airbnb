const mongose=require("mongoose");
let schema=mongose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");

const userschema=new schema({
    email:{
        type:String,
        required: true
    }
});
userschema.plugin(passportlocalmongoose);
module.exports=mongose.model("user",userschema);