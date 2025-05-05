import { RequestHandler } from "express";
import { foodCategoryModel } from "../../models/foodCategory.model";

export const createCategoryController: RequestHandler = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await foodCategoryModel.create({
      categoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
  }
};
