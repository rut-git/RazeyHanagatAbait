const mongoose =require("mongoose")

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true

    },
    phone:{
        type:String
    },
    roles:{
        type:String,
        enum:['admin','secretary','refresh','leap','engaged'],
        default:"refresh"
    }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model('Users',UserSchema)