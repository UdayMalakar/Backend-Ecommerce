const User = require("../models/userSchema");
const Product =require("../models/productSchema");
exports.addProduct = async(req,res)=>{
    try{
        const Id =req.params.id;
        console.log(Id);
        const findProductId = await Product.findById(Id);
        const userId = req.user.id;
        console.log(userId)
        if(!findProductId)
        {
            return res.status(404)
            .json({
                success:false,
                message:"Id nhi milli"
            })
        }
        const updateUser = await User.findByIdAndUpdate(userId,  {
            $push: {
              products:Id,
            },
          },
          { new: true });

          return res.status(200)
          .json({
            success:true,
            message:"Item added successfully",
            
          })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Product not addedd"
        })
    }
};


exports.removeProduct = async(req,res)=>{
    try{
        const Id =req.params.id;
        console.log(Id);
        const findProductId = await Product.findById(Id);
        if(!findProductId)
        {
            return res.status(404)
            .json({
                success:false,
                message:"Id nhi milli"
            })
        }
        const updateUser = await User.findByIdAndUpdate(req.user.id,  {
            $pull: {
              products:Id,
            },
          },
          { new: true });

          return res.status(200)
          .json({
            success:true,
            message:"Item removed successfully"
          })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Product not removed addedd"
        })
    }
};


exports.getAllUserProduct =async(req,res)=>{
    try{

        const userId =req.user.id;
        console.log(userId)

        const userFind = await User.findById(userId);
        console.log(userFind);

        const productArray = userFind.products;

        let response=[];
        for(let i=0;i<productArray.length;i++)
        {
            let dataId=productArray[i];

            data = await Product.findById(dataId);
            response.push(data);
        }

        return res.status(200)
        .json({
            success:true,
            message:"data mil gya",
            data:response
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"somthing went wrong"
        })
    }
};

exports.getAllProducts("/data",async(req,res)=>{
       try{

        const getData=await Product.find({});
        return res.status(200)
        .json({
            success:true,
            message:"data aa gya",
            getData,
        })

       }catch(error)
       {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing went wrong"
        })
       }
})
