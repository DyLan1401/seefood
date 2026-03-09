import dotenv from "dotenv";
dotenv.config();
//
import express from "express";
import cors from "cors";


//import API
import productRoutes from "./routes/productRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import orderRoutes from "./routes/orderRoutes.js"
import authRoute from "./routes/authRoute.js"

//
const app = express();
app.use(cors());
app.use(express.json());



// api
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", authRoute);




//lắng nghe PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("API running on port " + PORT));
