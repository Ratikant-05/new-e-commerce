import Cart from '../Model/cartModel.js';
import Product from '../Model/productModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Assuming user ID is extracted from authentication middleware

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({
        user: userId,
        cartItems: [{ product: productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.cartItems.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Update quantity if product exists
        existingItem.quantity += quantity;
      } else {
        // Add new product to cart
        cart.cartItems.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get cart items
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("cartItems.product");
        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove item from cart

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming user ID is extracted from authentication middleware

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to be removed
    const updatedCartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    // Check if any change happened
    if (updatedCartItems.length === cart.cartItems.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.cartItems = updatedCartItems;
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};