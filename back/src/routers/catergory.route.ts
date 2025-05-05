import { Router } from "express";
import { getCategory } from "../controllers/category/get-category";
import { deleteCategory } from "../controllers/category/delete-category";
import { updateCategory } from "../controllers/category/update-category";
import { getCategories } from "../controllers/category/get-categories";
import { createCategoryController } from "../controllers/category/create-category";

const categoryRouter = Router();
categoryRouter
  .get("/", getCategory)
  .post("/post", createCategoryController)
  .get("/count", getCategories)
  .delete("/delete", deleteCategory)
  .put("/put", updateCategory);

export default categoryRouter;
