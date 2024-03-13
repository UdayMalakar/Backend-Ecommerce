const mongoose =require("mongoose");
require("dotenv").config();
const dbconnect = ()=>{
    mongoose.connect(process.env.DATA_BASE_URL)
    .then(()=>{
        console.log("Data Base Connected successfully")
    })
    .catch((error)=>{
        console.log(error);
    })
};


module.exports= dbconnect;