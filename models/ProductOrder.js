const mongoose = require("mongoose");
const ProductOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ProductOrder", ProductOrderSchema);
