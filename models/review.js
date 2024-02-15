const mongose=require("mongoose");

let schema=mongose.Schema;
let reviewschema=new schema({
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
const Review=mongose.model("Review",reviewschema);
module.exports=Review;