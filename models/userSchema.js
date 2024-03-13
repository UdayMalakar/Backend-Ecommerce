const mongoose =require("mongoose");
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImg:{
        type:String,
        required:true,
    },
    orderHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderHistory"
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User",
    }
});


module.exports = mongoose.model("User",userSchema);