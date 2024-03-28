const mongoose = require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    categoryArray:[{
        type:String,
        required:true
    }],
    price:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    off:{
        type:Number,
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});


module.exports= mongoose.model("Product",productSchema);