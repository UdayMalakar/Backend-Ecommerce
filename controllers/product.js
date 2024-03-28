const User = require("../models/userSchema");
const Product =require("../models/productSchema");
const {uploadImageToCloudinary}= require("../config/imageUploader");
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


exports.getAllProducts = async(req,res)=>{
    try{

        const getData=await Product.find({});

        return res.status(200)
        .json({
            success:true,
            message:"Data aa gya",
            getData
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
}

//product create by admin


exports.createProduct = async(req,res)=>{
    try{
       
         console.log(req.user.id)
         const {name,price,categoryArray,totalPrice,off,description,category}=req.body;

         console.log(name);
         console.log(price);


         if(!name || !price || !category || !categoryArray || !totalPrice || !off || !description){
            return res.status(401).
            json({
                success:false,
                message:"Please Enter all the fields"
            })
         };

         const productImage = req.files.img;

        console.log(productImage);

         const thumbnailImage = await uploadImageToCloudinary(
            productImage,
            "myfolder"
          )
          console.log("product image URL",thumbnailImage)

         const newProduct = await Product.create({
            name,
             categoryArray,
            price,
            img:thumbnailImage.url,
             totalPrice,
             off,
            description,
            category,
            adminId:req.user.id
         })

         return res.status(200).json({
            success:true,
            message:"Product created Successfully"
         })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing Went Wrong here"
        })
    }
};


// Assuming you've already set up your Express Router and imported necessary modules

// Define a route for updating a product
  exports.updateProduct= async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Extract the fields to be updated from the request body
        Object.assign(product, req.body);
        // const { name, price, categoryArray, totalPrice, off, description, category } = req.body;

        // // Update the product object
        // product.name = name;
        // product.price = price;
        // product.categoryArray = categoryArray;
        // product.totalPrice = totalPrice;
        // product.off = off;
        // product.description = description;
        // product.category = category;

        // Save the updated product
        const updatedProduct = await product.save();

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};


exports.deleteProduct= async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete the product
        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};
