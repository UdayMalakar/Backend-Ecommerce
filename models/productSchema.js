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
    }],
    price:{
        type:Number,
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
    }
});


module.exports= mongoose.model("Product",productSchema);