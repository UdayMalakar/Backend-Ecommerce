const express = require("express");
const router = express.Router();
const {signUp,login} = require("../controllers/Auth");
const {auth} =require("../middlewares/auth");
const {addProduct, removeProduct, getAllUserProduct} =require("../controllers/product")
router.post("/signup",signUp);
router.post("/login",login);
router.get("/test",auth,(req,res)=>{
    return res.status(200)
    .json({
        success:true,
        message:"good"
    })
})
router.get("/baba",()=>{
    res.send("BABA IS HERE")
})
router.put("/addItem/:id",auth,addProduct);
router.put("/removeItem/:id",auth,removeProduct);
router.get("/getProduct",auth,getAllUserProduct);
module.exports=router;