import Order from "../Model/orderModel.js";
import Cart from "../Model/cartModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user
    const { shippingAddress, paymentMethod } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Convert cart items to order items
    const orderItems = cart.cartItems.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Calculate total price
    const totalPrice = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Create new order
    const newOrder = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    // Save the order
    await newOrder.save();

    // Clear the cart after order placement
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

export const getUserOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params);
    // console.log(order)

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};