import mongoose from "mongoose";

export const  connectDB = async() => {
    try{
        mongoose.connection.on('connected', ()=> {
            console.log('Database connected')
    });
        await mongoose.connect(`${process.env.MONGODB_URI}/Eco-finds`)
    }catch(error){
        console.log("Mongodb connection error",error.message);
    }
}

