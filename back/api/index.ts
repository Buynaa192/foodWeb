import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { Request } from "express";
import categoryRouter from "../src/routers/catergory.route";
import foodRouter from "../src/routers/food.route";
import userRouter from "../src/routers/user.route";
import orderRouter from "../src/routers/order.route";
import { authRouter } from "../src/routers/auth.route";
import { connectToDatabase } from "../src/database/connect-to-db";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    isAdmin?: boolean;
  }
}

config();
connectToDatabase();
const app = express();
const port = 3001;

app
  .use(cors())
  .use(express.json())
  .use("/food", foodRouter)
  .use("/category", categoryRouter)
  .use("/user", userRouter)
  .use("/order", orderRouter)
  .use("/auth", authRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
