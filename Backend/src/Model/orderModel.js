import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderItems:[{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        name:{
          type: String,
          required: true
        },
        quantity:{
          type: Number,
          required: true
        },
        price:{
          type: Number,
          required: true
        },
      }],
    shippingAddress:{
      address:{
        type: String,
        required: true
      },
      city:{
        type: String,
        required: true
      },
      postalCode:{
        type: String,
        required: true
      },
      country:{
        type: String,
        required: true
      },
    },
    paymentMethod:{
      type: String,
      required: true
    },
    paymentStatus:{
      type: String,
      default: "Pending"
    }, // Paid, Pending, Failed
    totalPrice:{
      type: Number,
      required: true
    },
    orderStatus:{
      type: String,
      default: "Processing"
    }, // Processing, Shipped, Delivered, Cancelled
  },{ timestamps: true });

export default mongoose.model("Order", orderSchema);
