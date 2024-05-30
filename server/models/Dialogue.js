const mongoose =require("mongoose")
const MessagesSchema=require("./Messages")
const DialoguesSchema=new mongoose.Schema({
    dialogueName:{
        type:String,
        required:true
    },
    dialogue:{
        type:[MessagesSchema],
        required:true
        },
            userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    workerStatus:{
        type:String,
        enum:['admin','secretary'],
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
module.exports=mongoose.model('Dialogues',DialoguesSchema)