import { RequestHandler } from "express";
import { foodCategoryModel } from "../../models/foodCategory.model";
import { foodModel } from "../../models/food.model";

export const getCategories: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const category = await foodModel
      .find(categoryId ? { category: categoryId } : {})
      .populate("category")
      .countDocuments();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "hudshuu" });
  }
};

