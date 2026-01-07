import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken }  from "../lib/utils.js"


export const  signup =   async(req,res)=>{
    const {email,display_name,password} = req.body;
    try{
     if(!email|| !display_name|| !password ){
        return res.json({sucess:false,message: "Missing Details"})
     }
     const user  = await User.findOne({email});

     if(user){
        return res.json({success: false,message: "Account Already esists"})
     }

     const salt = await  bcrypt.genSalt(10);
     const hashedPassword  = await bcrypt.hash(password, salt);
     
     const newUser  = await User.create({
        display_name,email,password: hashedPassword
     });
     const token = generateToken(newUser._id)

     res.json({success: true, userData: newUser,token,message:"Account created successfully"})
    }catch(error){
      res.json({success: false,message: error.message})
    }
}

