import { Router } from "express";
import { getOrder } from "../controllers/order/get-order";
import { postOrder } from "../controllers/order/post-order";
import { patchOrder } from "../controllers/order/patch-order";
import { deleteOrder } from "../controllers/order/delete-order";
import { getOneOrder } from "../controllers/order/getOneOrder";
// import { getOrderCount } from "../controllers/order/getOrderCount";

const orderRouter = Router();
orderRouter
  .get("/", getOrder)
  .get("/:id", getOneOrder)
  .post("/post", postOrder)
  .put("/put", patchOrder)
  .delete("/delete", deleteOrder);
// .get("/", getOrderCount);
export default orderRouter;
