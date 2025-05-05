import { RequestHandler } from "express";
import { foodCategoryModel } from "../../models/foodCategory.model";

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const result = await foodCategoryModel.deleteOne({ categoryName });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "category oldsongui" });
      return;
    }
    res.status(200).json({ message: "category ustgagdsn" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
