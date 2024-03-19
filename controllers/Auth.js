//signUp controller
const user= require("../models/userSchema");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken")
exports.signUp= async (req,res)=>{
    try{

        const{firstName ,lastName, email, password} =req.body;

        if(!firstName || !lastName || !email || !password)
        {
            return res.status(403)
            .json({
                success:false,
                message:"Please fill all the fields properly"
            })
        }

        const userExist = await user.findOne({email:email});

        if(userExist)
        {
            return res.status(401)
            .json({
                success:false,
                message:"User Already registerd"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        if(hashedPassword)
        {
            const newUser = await user.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                profileImg:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            });

            return res.status(200).
            json({
                success:true,
                message:"User signUp successfully",
                newUser
            })
        }

        return res.status(403)
        .json({
            success:false,
            message:"Password Not hashed plz try later"
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing went wrong here"
        })
    }
};


//Login route

exports.login = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please enter all the fields"
            });
        }
        console.log(email)
        let userExist = await user.findOne({email:email});
        
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "User Not found, please enter correct email",
            });
        }

        const comparePassword = await bcrypt.compare(password, userExist.password);
        if (comparePassword) {
            const token = jwt.sign(
                { email: userExist.email, id: userExist._id, role: userExist.role },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            // Save token to user document in the database
            userExist = userExist.toObject();
            userExist.token = token;
            userExist.password = undefined;

            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options);
            return res.status(200).json({
                success: true,
                token,
                userExist,
                message: "User Login Success"
            });
        }

        return res.status(402).json({
            success: false,
            message: "Please enter correct password"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went wrong"
        });
    }
};
