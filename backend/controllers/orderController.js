import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { items, address, total_amount } = req.body;
    const buyerId = req.user._id;
    const buyerName = req.user.display_name;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Order must contain at least one item",
      });
    }

    if (!address || !address.street || !address.city || !address.state || !address.postal_code) {
      return res.status(400).json({
        success: false,
        error: "Complete address is required",
      });
    }

    if (!total_amount || total_amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Valid total amount is required",
      });
    }

    // Create order with buyer info
    const orderData = {
      buyer: buyerId,
      buyer_name: buyerName,
      items: items.map(item => ({
        product_id: item._id || item.product_id,
        product_title: item.product_title,
        price: item.price,
        quantity: item.quantity || 1,
        category: item.category,
        seller_id: item.seller,
        seller_name: item.seller_name,
        image: item.image,
      })),
      total_amount,
      address,
      payment_status: "Completed",
      status: "Confirmed",
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const orders = await Order.find({ buyer: buyerId })
      .populate('items.product_id')
      .sort({ order_date: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: "Invalid order ID format",
      });
    }

    const order = await Order.findById(id)
      .populate('items.product_id')
      .populate('buyer', 'display_name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    // Check if user owns this order
    if (order.buyer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized: You can only view your own orders",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: "Invalid order ID format",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    // Check if user owns this order
    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized: You can only cancel your own orders",
      });
    }

    // Can only cancel pending or confirmed orders
    if (!["Pending", "Confirmed"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot cancel order with status: ${order.status}`,
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
