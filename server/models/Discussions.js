const mongoose =require("mongoose")
const MessagesSchema=require("./Messages")
const DiscussionsSchema=new mongoose.Schema({
    discussion:{
        type:[MessagesSchema],
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    discussionName:{
        type:String,
        required:true
    },
    read:{
        type:mongoose.Schema.Types.Boolean,
        default:false
    }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model('Discussions',DiscussionsSchema)