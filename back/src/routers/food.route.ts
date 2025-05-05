import { Router } from "express";
import { createFood } from "../controllers/food/create-food";
import { getOneFood } from "../controllers/food/getOneFood";
import { updateFood } from "../controllers/food/update-food";
import { deleteFood } from "../controllers/food/delete-food";
import { getFoodsByCategory } from "../controllers/food/getFoodsByCategory";
import { allCount } from "../controllers/food/allCount";
const foodRouter = Router();
foodRouter
  .post("/post", createFood)
  .get("/:id", getOneFood)
  .put("/put", updateFood)
  .delete("/delete", deleteFood)
  .get("/", getFoodsByCategory)
  .get("/count", allCount);
export default foodRouter;
