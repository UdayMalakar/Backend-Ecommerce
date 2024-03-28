const mongoose=require("mongoose");

const orderHisSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    date:{
        type:Date,
        default:Date.now()
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["cancel","pending","Deliverd"],
        default:"pending"
    },
   
});


module.exports= mongoose.model("OrderHistory",orderHisSchema);