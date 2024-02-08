const mongose=require("mongoose");

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
        type:Object,
        default:{
            filename:"nothing",
            url:"https://images.unsplash.com/photos/living-room-set-with-green-dumb-cane-plant-R-LK3sqLiBw",
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
    }
});

const listing=mongose.model("listing",listingschema);

module.exports=listing;
