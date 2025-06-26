const express = require("express");
const app = express();
const port = 3009;
const cors = require("cors");
const AuthRoutes = require("./routes/authRoutes");
const OrderRoutes = require("./routes/orderRoutes");

const connectDB = require("./config/db");
app.use(
  cors({
    origin: ["http://localhost:3001","https://easycart-roan.vercel.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
  })
);
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", AuthRoutes);
app.use("/orders", OrderRoutes);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
