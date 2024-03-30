const express = require("express");
const router = express.Router();
const {signUp,login,CustmoreDetailes} = require("../controllers/Auth");
const {auth, isAdmin} =require("../middlewares/auth");
const {addProduct, removeProduct, getAllUserProduct,createProduct,updateProduct,deleteProduct, getAllProducts} =require("../controllers/product");
const {getOrder,orderCancel,getAllOrder,OrderDeleverd,getOrderDetailes,orderTaken} =require("../controllers/order");
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
router.get("/data",getAllProducts)
router.post("/getOrder",auth,getOrder);
router.put("/cancelOrder/:oId",auth,orderCancel);
router.put("/orderDeliverd/:oId",auth,OrderDeleverd)
router.get("/getAllOrder",auth,getAllOrder);
router.post("/uploadProduct",auth,isAdmin,createProduct);
router.put("/updateProduct/:id",auth,isAdmin,updateProduct);
router.get("/orders",auth,isAdmin,orderTaken)
router.delete("/deleteProduct/:id",auth,isAdmin,deleteProduct);
router.get("/customers-detailes",auth,isAdmin,CustmoreDetailes);


module.exports=router;
