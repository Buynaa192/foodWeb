import { RequestHandler } from "express";
import { foodModel } from "../../models/food.model";

export const getFoodsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const foods = await foodModel
      .find(categoryId ? { category: categoryId } : {})
      .populate("category");
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "hud2" });
  }
};
//http://localhost:3001/food?categoryId=67ff4c1ddde837e8e9ba5276 duudhad ashihlah
