const mongose=require("mongoose");

const review=require("./review");


let schema=mongose.Schema;
const listingschema=new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:{
            filename:String,
        url:String,
        },
        default:{
            filename:"nothing",
            url:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        // set: (v)=> v===""? v:"https://unsplash.com/photos/white-and-grey-concrete-building-near-swimming-pool-under-clear-sky-during-daytime-2d4lAQAlbDA"  
    },
    price:{
        type:Number
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type:schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:schema.Types.ObjectId,
        ref:"user"
    },
    category:{
        type:String,
        enum:["lakes","mountain","castles","farms","arctic","beach"]
    }
});

listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}})
    }
})

const listing=mongose.model("listing",listingschema);

module.exports=listing;


