export const validateProduct  = (req,res,next) =>{
    const {
        product_title,
        description,
        price,
        quantity,
        year_of_manufacture,
        model,
        brand,
        weight,
        material,
        color,
        working_condition_description,
        condition,
        category,
        image
    } = req.body;

    const errors = [];


    //fields 
    if(!product_title) errors.push("product title is  required");
    if(!description) errors.push("description is required");
    if(price === undefined)errors.push("price is required");
    if(quantity === undefined)errors.push("quantity is  required");
    if(!year_of_manufacture)errors.push("required");
    if(!model)errors.push("required");
    if(!brand)errors.push("required");
    if(weight === undefined)errors.push("weight is required");
    if(!material)errors.push("material is required");
    if(!color)errors.push("color is required");
     if (!working_condition_description) errors.push("working_condition_description is required");
  if (!condition) errors.push("condition is required");
  if (!category) errors.push("category is required");
  if (!image) errors.push("image is required");

   

  if (price !== undefined && price < 0) errors.push("price must be non-negative");
  if (quantity !== undefined && quantity < 0) errors.push("quantity must be non-negative");
  if (weight !== undefined && weight < 0) errors.push("weight must be non-negative");

  const validConditions = ["New", "Used", "Refurbished"];
  if (condition && !validConditions.includes(condition)) {
    errors.push(`condition must be one of: ${validConditions.join(", ")}`);
  }

   const validCategories = [
    "Furniture",
    "Clothes",
    "Electronics",
    "Beddings",
    "Wearables",
    "Home Decor",
    "Study Material",
    "Kitchen Appliances",
  ];
  if (category && !validCategories.includes(category)) {
    errors.push(`category must be one of: ${validCategories.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};
