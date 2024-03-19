const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userSchema");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
    try {
        const token =  req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")  ||
            req.body.token ;
        
            console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token Missing' });
        }

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({ success: false, message: 'token is invalid' });
        }

        // If the token is valid, proceed to the next middleware or route handler
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Something Went Wrong While Validating the Token',
        });
    }
};

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.role!=="Admin")
        {
            return res.status(403)
            .json({
                success:false,
                message:"This is Protected Route for Admin"
            })
        }

        next();
    }catch(error)
    {
        console.log(error)
        return res.status(500)
        .json({
            success:false,
            message:"Somthing went wrong this route"
        })
    }
}