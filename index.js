const express= require("express");
const app= express();
const dbconnect = require("./config/database");
const router = require("./routes/userRoutes");
require("dotenv").config();
const cookieParser =require("cookie-parser");
const product=require("./models/productSchema");
const order =require("./models/orderhHisSchema")
const PORT= process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use("/api/v1",router);
dbconnect();
app.get("/",(req,res)=>{
    res.send("HOME IS HERE")
})
app.listen(PORT,()=>{
    console.log(`Server is started at: ${PORT}`)
});