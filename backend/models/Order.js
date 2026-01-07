import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer_name: {
    type: String,
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      product_title: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1,
      },
      category: String,
      seller_id: mongoose.Schema.Types.ObjectId,
      seller_name: String,
      image: String,
    },
  ],
  total_amount: {
    type: Number,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  payment_status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  delivery_date: Date,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;