import User from "../models/User.js"
import jwt from "jsonwebtoken";

export const protectRoute  = async(req,res,next)=>{
    try{
        // Support both 'token' header and 'Authorization: Bearer <token>'
        let token = req.headers.token;
        
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
        if (!token) {
            return res.status(401).json({success: false, message: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).json({success: false, message:"User not found"});
        
        req.user = user;
        next();
    }catch(error){
        console.log(error.message)
        return res.status(401).json({ success: false, message: error.message});
    }
}