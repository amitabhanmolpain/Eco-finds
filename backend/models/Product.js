import mongoose from "mongoose"

const  productschema  =  new mongoose.schema({
   product_title:{
    type:String,
    required: true,
   },
   description:{
    type:String,
    required: true,
   },
   price:{
    type:Number,
    required: true,
   },
   quantity:{
    type:Number,
    required: true,
   },
   manufacture:{
    type:Number,
    required: true,
   },
   model:{
    type:String,
    required: true,
   },
   weight:{
    type:Number,
    required: true,
   },
   material:{
    type:String,
    required:true,
   },
   color:{
    type:String,
    required: true,
   },
   working_description:{
    type:String,
    required: true,
   },
   condition: {
      type: String,
      enum: ["New", "Used", "Refurbished"],
      required: true,
    },
    status: {
        type: String,
        enum: ["Available","Sold"],
        required: true,
        default: "Used"
    },
    category: {
      type: String,
      enum: [
        "Furniture",
        "Clothes",
        "Electronics",
        "Beddings",
        "Wearables",
        "Home Decor",
        "Study Material",
        "Kitchen Appliances",
      ],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

},{timestamps: true})

export default productschema

