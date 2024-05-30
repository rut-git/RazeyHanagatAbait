const mongoose =require("mongoose")

const MessagesSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    }
   
    },
    {
        timestamps:true
    }
)
module.exports=MessagesSchema