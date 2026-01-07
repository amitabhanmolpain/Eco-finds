
import Product from "../models/Product.js"

export const  createProduct  = async (req,res) => {
    try {
        const productData = {
            ...req.body,
            seller: req.user._id,
            seller_name: req.user.display_name
        };
        const product  = new Product(productData);
        await product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product 
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message 
        });
    }
};


export const getAllProducts = async (req, res) => {
  try {
    const { 
      category, 
      status, 
      condition, 
      minPrice, 
      maxPrice,
      brand,
      color,
      page = 1,
      limit = 10
    } = req.query;
    
    const filter = {};
    const validCategories = ["Furniture", "Clothes", "Electronics", "Beddings", "Wearables", "Home Decor", "Study Material", "Kitchen Appliances"];
    const validStatuses = ["Available", "Sold"];
    const validConditions = ["New", "Used", "Refurbished"];

    // Validate category if provided
    if (category) {
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(", ")}`
        });
      }
      filter.category = category;
    }
    
    // Validate status if provided
    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
        });
      }
      filter.status = status;
    }
    
    // Validate condition if provided
    if (condition) {
      if (!validConditions.includes(condition)) {
        return res.status(400).json({
          success: false,
          error: `Invalid condition. Must be one of: ${validConditions.join(", ")}`
        });
      }
      filter.condition = condition;
    }
    
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (color) filter.color = { $regex: color, $options: "i" };
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    } 

     const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);
    
    const total = await Product.countDocuments(filter);

    res.status(200).json({ 
      success: true, 
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: products 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};



export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid product ID format" 
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: "Product not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: product 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: "Product not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Product updated successfully",
      data: product 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: "Product not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully",
      data: {} 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};


export const getProductsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({ seller: userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        error: "Search query is required" 
      });
    }

    const products = await Product.find({
      $or: [
        { product_title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { model: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      count: products.length, 
      data: products 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};


export const getProductsByCategory = async (req, res) => {
  try {
    let { category } = req.params;
    
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

    // Convert snake_case to Title Case (e.g., "kitchen_appliances" -> "Kitchen Appliances")
    if (category.includes('_')) {
      category = category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else if (category && !category.includes(' ')) {
      // Single word categories: capitalize first letter
      category = category.charAt(0).toUpperCase() + category.slice(1);
    }

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: `Invalid category. Must be one of: ${validCategories.join(", ")}`
      });
    }

    const products = await Product.find({ category }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};



// Update product status (Available/Sold)
export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !["Available", "Sold"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Status must be either 'Available' or 'Sold'"
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Product status updated to ${status}`,
      data: product
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};