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
export const login = async(req,res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.json({success: false, message: "Missing Details"})
        }
        
        const user = await User.findOne({email});
        
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"})
        }
        
        const token = generateToken(user._id);
        
        res.json({success: true, userData: user, token, message: "Login successful"})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

export const checkAuth = async(req, res)=>{
    try{
        res.json({success: true, user: req.user, userData: req.user})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

export const updateProfile = async(req, res)=>{
    try{
        const {display_name, profilePic} = req.body;
        const userId = req.user._id;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {display_name, profilePic},
            {new: true}
        );
        
        res.json({success: true, userData: updatedUser, message: "Profile updated successfully"})
    }catch(error){
        res.json({success: false, message: error.message})
    }
}