import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();

// PARSERS
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce TS is running");
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Not Found.",
  });
});

export default app;
