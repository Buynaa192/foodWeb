// hool shincleh
import { RequestHandler } from "express";

import { foodModel } from "../../models/food.model";

export const updateFood: RequestHandler = async (req, res) => {
  try {
    const { id, newPrice, newCategory, newFoodName, newIngredients, newImage } =
      req.body;

    const result = await foodModel.updateOne(
      { _id: id },

      {
        $set: {
          foodName: newFoodName,
          price: newPrice,
          category: newCategory,
          ingredients: newIngredients,
          image: newImage,
          updatedAt: new Date(),
        },
      }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "food not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "hud2" });
  }
};
