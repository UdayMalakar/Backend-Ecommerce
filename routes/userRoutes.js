const express = require("express");
const router = express.Router();
const {signUp,login} = require("../controllers/Auth");
const {auth,isAdmin} =require("../middlewares/auth");
const {addProduct, removeProduct, getAllUserProduct,createProduct,updateProduct,deleteProduct} =require("../controllers/product");
const {getOrder,orderCancel,getAllOrder,orderTaken, OrderDeleverd,getOrderDetailes} =require("../controllers/order");
router.post("/signup",signUp);
router.post("/login",login);
router.get("/test",auth,(req,res)=>{
    return res.status(200)
    .json({
        success:true,
        message:"good"
    })
})
router.get("/baba",(req,res)=>{
    res.send("BABA IS HERE")
})
router.put("/addItem/:id",auth,addProduct);
router.put("/removeItem/:id",auth,removeProduct);
router.get("/getProduct",auth,getAllUserProduct);
router.post("/getOrder",auth,getOrder);
router.put("/cancelOrder/:oId",auth,orderCancel);
router.put("/orderDeliverd/:oId",auth,OrderDeleverd)
router.get("/getAllOrder",auth,getAllOrder);
router.get("/getOrderDetailes/:oId",auth,getOrderDetailes);
router.get("/isAdmin",auth,isAdmin,()=>{
    return res.status(200)
    .json({
        success:true,
        message:"Welcom to Admin"
    })
});

router.post("/uploadProduct",auth,isAdmin,createProduct);
router.put("/updateProduct/:id",auth,isAdmin,updateProduct);
router.delete('/deleteProduct/:id',auth,isAdmin,deleteProduct);
router.get("/orderTaken",auth,isAdmin,orderTaken);
module.exports=router;