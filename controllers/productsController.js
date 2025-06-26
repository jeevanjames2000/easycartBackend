const ProductOrder = require("../models/ProductOrder");
module.exports = {
  saveProducts: async (req, res) => {
    const { name, email, products, totalAmount } = req.body;

    // Validate payload
    if (
      !name ||
      !email ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !products.every(
        (product) =>
          product.id &&
          typeof product.id === "number" &&
          product.name &&
          typeof product.name === "string" &&
          product.quantity &&
          typeof product.quantity === "number" &&
          product.price &&
          typeof product.price === "number"
      ) ||
      !totalAmount ||
      typeof totalAmount !== "number"
    ) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    try {
      const newOrder = await ProductOrder.create({
        name,
        email,
        products,
        totalAmount,
        paymentStatus: "pending", // Optional: explicitly set default
      });
      res
        .status(201)
        .json({ message: "Order saved successfully", order: newOrder });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving order", error: error.message });
    }
  },

  getAllOrdersByEmail: async (req, res) => {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
      const orders = await ProductOrder.find({ email }).sort({ createdAt: -1 });
      res.status(200).json({ orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching orders", error: error.message });
    }
  },
  getAllOrdersByEmail: async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });
    try {
      const orders = await ProductOrder.find({ email }).sort({ createdAt: -1 });
      res.status(200).json({ orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching orders", error: error.message });
    }
  },
};
