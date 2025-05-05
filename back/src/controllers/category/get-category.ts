import { foodCategoryModel } from "../../models/foodCategory.model";

export const getCategory = async (req, res) => {
  const categories = await foodCategoryModel.find({});
  return res.status(200).json({ categories });
};
