const User =require("../models/userSchema");
const Order=require("../models/orderhHisSchema");
const Product=require("../models/productSchema")
exports.getOrder = async(req,res)=>{
    try{
        const userId=req.user.id;
        const {price}=req.body;
        const findUser = await User.findById(userId);

        const order = await Order.create({
            user:findUser,
            products:findUser.products,
            price
        });

        const updateUser = await User.findByIdAndUpdate(userId,{
            $push:{
                orderHistory:order._id,
            },
            products:[],
        },{new:true});

        return res.status(200)
        .json({
            success:true,
            message:"Order ho gya"
        })



    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Order nhi ho pa rha hai"
        })
    }
};


exports.orderCancel = async (req,res)=>{
    try{

        const orderId = req.params.oId;

        const findOrder = await Order.findById(orderId);

        if(!findOrder)
        {
            return res.status(404)
            .json({
                success:false,
                message:"order nhi hai ish id se"
            })
        };

        const updateOrder = await Order.findByIdAndUpdate(orderId,{
            status:"Cancel",
        },{new:true});


        return res.status(200)
        .json({
            success:true,
            message:"order cancel successfully"
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"something went wrong here"
        })
    }
};

exports.getAllOrder =async(req,res)=>{
    try{
        const userId =req.user.id;
        console.log(userId)

        const userFind = await User.findById(userId);
        console.log(userFind);

        const orderArray = userFind.orderHistory;

        let response=[];
        for(let i=0;i<orderArray.length;i++)
        {
            let dataId=orderArray[i];

            let data = await Order.findById(dataId);
            response.push(data);
        }

        return res.status(200)
        .json({
            success:true,
            message:"data mil gya",
            response
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

exports.orderTaken = async(req,res)=>{
    try{
        const orderArray = await Order.find({});

        let response=[];
        for(let i=0;i<orderArray.length;i++)
        {
            let dataId=orderArray[i];

            data = await Order.findById(dataId);
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

exports.OrderDeleverd = async(req,res)=>{
    try{
    const orderId = req.params.oId;

    const findOrder = await Order.findById(orderId);

    if(!findOrder)
    {
        return res.status(404)
        .json({
            success:false,
            message:"order nhi hai ish id se"
        })
    };

    const updateOrder = await Order.findByIdAndUpdate(orderId,{
        status:"Delivered",
    },{new:true});


    return res.status(200)
    .json({
        success:true,
        message:"order cancel successfully"
    })

}catch(error)
{
    console.log(error);
    return res.status(500)
    .json({
        success:false,
        message:"something went wrong here"
    })
}
    
}


exports.getOrderDetailes = async (req,res)=>{
    try{
        const orderId = req.params.oId;
    
        const findOrder = await Order.findById(orderId);
    
        if(!findOrder)
        {
            return res.status(404)
            .json({
                success:false,
                message:"order nhi hai ish id se"
            })
        };

        let response=[];
        for(let i=0;i<findOrder.products.length;i++)
        {
            let dataId=findOrder.products[i];

            data = await Product.findById(dataId);
            response.push(data);
        }
       
    
        return res.status(200)
        .json({
            success:true,
            message:"sara Data mil gya ek oreder ka",
            response
        })
    
    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"something went wrong here"
        })
    }
}
