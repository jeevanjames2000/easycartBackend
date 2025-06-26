const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/productsController");
router.post("/saveProducts", OrdersController.saveProducts);
router.get("/getAllOrdersByEmail", OrdersController.getAllOrdersByEmail);

module.exports = router;
