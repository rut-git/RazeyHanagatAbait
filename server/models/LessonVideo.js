const mongoose =require("mongoose")

const LessonVideoSchema=new mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:['refresh','leap','engaged'],
    }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model('LessonVideo',LessonVideoSchema)