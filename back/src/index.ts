import express from "express";
import foodRouter from "./routers/food.route";
import categoryRouter from "./routers/catergory.route";
import { connectToDatabase } from "./database/connect-to-db";
import userRouter from "./routers/user.route";
import cors from "cors";
import orderRouter from "./routers/order.route";
connectToDatabase();
const app = express();
const port = 3001;

app
  .use(cors())
  .use(express.json())
  .use("/food", foodRouter)
  .use("/category", categoryRouter)
  .use("/user", userRouter)
  .use("/order", orderRouter);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
